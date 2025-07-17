import { TextInput,View,StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen(props){
    return(
        <View style={styles.inputContainer }>
            <TextInput style={styles.numberInput} maxLength={2}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            />
              <PrimaryButton pressHandler={props.pressHandler}>RESET</PrimaryButton>
              <PrimaryButton pressHandler={props.pressHandler}>Confirm</PrimaryButton>

            <TextInput style={styles.numberInput} maxLength={2}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            />
            <PrimaryButton pressHandler={props.pressHandler}>RESET</PrimaryButton>
            <PrimaryButton pressHandler={props.pressHandler}>Confirm</PrimaryButton>

        </View>

        
    )
}


export default StartGameScreen;

const styles = StyleSheet.create({
inputContainer:{
    marginHorizontal:24,
    padding:16,
    marginTop:100,
    backgroundColor:'#4e0329',  /* A0D6F0 */ 
    borderRadius:8,
    elevation:4,
    
},
numberInput:{
    width:50,
    height:50,
    fontSize:32,
    borderBottomColor:"#ddb52f",
    borderBottomWidth:2,
    color:"#ddb52f",
    marginVertical:8,
    fontWeight:"900",
    textAlign:"center"
}
})