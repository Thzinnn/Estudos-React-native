import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import  Button from '../components/Ui/Button'
import { useNavigation } from '@react-navigation/native'
import { useUserStore } from '../stores/userStores'

const Editar = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const {user} = route.params

    const removeUserStore = useUserStore((state) => state.removeUser)

    const [txtName, setTxtName] = useState(user.name)
    const [txtEmail, setTxtEmail] = useState(user.email)
    const [txtAvatar, setTxtAvatar] = useState(user.avatar)

    const editUser = async () =>{
        try{
          const result = await fetch(`https://estudos-no-backend-por-meio-de-js.onrender.com/user/${user.id}`, {
            method: "PUT",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name: txtName, email: txtEmail, avatar: txtAvatar})
          })
          const data = await result.json()
          console.log(data)
          if(data?.success){
            navigation.goBack()
          }
          else {
            alert(data.error)
          }
          
        } catch (error){
          console.log('Error editUser ' + error.message)
          alert(error.message)
        }
      } 

      const removeUser = async () =>{
        try{
          const result = await fetch(`https://estudos-no-backend-por-meio-de-js.onrender.com/user/${user.id}`, {
            method: "DELETE",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name: txtName, email: txtEmail, avatar: txtAvatar})
          })
          const data = await result.json()
          console.log(data)
          if(data?.success){  
              removeUserStore(user.id)
            navigation.goBack()
          }
          else {
            alert(data.error)
          }
          
        } catch (error){
          console.log('Error removeUser ' + error.message)
          alert(error.message)
        }
      } 

    return (
        <ScrollView>
            <View style={styles.form}>
                <TextInput 
                style={styles.input}
                placeholder='Nome...'
                onChangeText={setTxtName}
                value={txtName}
                />
                <TextInput 
                style={styles.input}
                placeholder='Email...'
                onChangeText={setTxtEmail}
                value={txtEmail}
                />
                <TextInput 
                style={styles.input}
                placeholder='Avatar...'
                onChangeText={setTxtAvatar}
                value={txtAvatar}
                />
                <Button 
                    title="Editar Usúario"
                    onPress={editUser}
                />
                <Button 
                    title="Remover Usúario"
                    onPress={removeUser}
                />
                <Button 
                    title="Products"
                    onPress={() => navigation.navigate('Products')}
                />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    form: {
        display: 'flex',
        padding: 40
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: '#FFF',
        borderWidth: 1,
        marginBottom: 18,
        padding: 10,
    }
})

export default Editar