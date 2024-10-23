
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over!</Text>
      <Text style={styles.score}>Your Score: {score}</Text>
      <Button title="Recycle More" onPress={() => navigation.navigate('GameScreen')} />
      <Button title="View Leaderboard" onPress={() => navigation.navigate('Leaderboard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  score: {
    marginTop: 20,
    fontSize: 20,
  },
});
