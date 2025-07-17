
import { StyleSheet } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  function handlePress() {
    console.log("Button pressed from App!");
  }
  return (
        <StartGameScreen  pressHandler={handlePress}/>
  );
}

const styles = StyleSheet.create({});