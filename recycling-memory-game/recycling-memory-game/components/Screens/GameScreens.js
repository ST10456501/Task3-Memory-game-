import  { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cardsData = [
  { id: 1, type: 'Plastic', img: require('./plastic.jpg') },
  { id: 2, type: 'Plastic', img: require('./plastic.jpg') },
  { id: 3, type: 'Glass', img: require('./glass.png') },
  { id: 4, type: 'Glass', img: require('./glass.png') },
  { id: 5, type: 'Paper', img: require('./paper.png') },
  { id: 6, type: 'Paper', img: require('./paper.png') },
  { id: 7, type: 'Contaminant', img: require('./Recyclablewast.jpg') },
  { id: 8, type: 'Contaminant', img: require('./Recyclablewast.jpg') }
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function GameScreen({ navigation }) {
  const [cards, setCards] = useState(shuffle([...cardsData]));
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); 

  const handleCardPress = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    setFlippedCards((prev) => [...prev, index]);

    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];
      const secondCard = cards[index];

      if (firstCard.type === secondCard.type) {
        setScore((prevScore) => prevScore + (firstCard.type === 'Contaminant' ? -5 : 10));
        setFlippedCards((prev) => [...prev, index]);
      } else {
        
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const endGame = useCallback(async () => {
    const oldScores = await AsyncStorage.getItem('scores');
    const newScores = oldScores ? JSON.parse(oldScores) : [];
    newScores.push({ score, time: 60 - timeLeft });
    await AsyncStorage.setItem('scores', JSON.stringify(newScores));

    navigation.navigate('ResultScreen', { score });
  }, [score, timeLeft, navigation]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          endGame(); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endGame]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match the Recycling Pairs!</Text>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => handleCardPress(index)} 
            disabled={flippedCards.length === 2}
          >
            <Image 
              source={flippedCards.includes(index) ? card.img : require('./BackCard.jpg')} 
              style={styles.image} 
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.score}>Recycling Points: {score}</Text>
      <Button 
        title="Finish Game" 
        onPress={endGame} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffde7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  timer: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
});
