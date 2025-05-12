import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  button: {
    marginVertical: 5
  },
  messageList: {
    flex: 1,
    marginVertical: 10
  },
  messageItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  messageText: {
    fontSize: 16
  }
});
