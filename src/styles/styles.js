import { StyleSheet } from 'react-native';


const rootbg = '#eee';
const boxbg = 'limegreen';
const elementbg = '#fff';
const elementbgdarkened = '#eee';
const elementbgdark = '#111';
const textdarkbg = '#fff';
const textdarkbg2 = '#aaa';

const successcolor = 'green';
const inputbordercolor = '#ccc';
const lightgrey = '#eee';
const lightertext = '#444';

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: rootbg,
    flexDirection: 'column',
    paddingTop: 60,
    //paddingLeft: 5,
    //paddingRight: 5,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: elementbg,
    borderBottomWidth: 1,
    borderColor: inputbordercolor,
  },
  headertext: {
    color: '#111',
    fontSize: 23,
    textAlign: 'center',
    flex: 1,
  },
  info: {
    flex: 0,
    height: 80,
    backgroundColor: boxbg,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  iconrow: {
    flexDirection: 'row',
    flex: 0,
  },
  icon: {
    flex: 1,
    height: 60,
    backgroundColor: boxbg,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },


  textinput: {
    flex: 1,
    height: 40,

  },
  inputicontouch: {
    flex: 0,
  },
  inputicon: {
    width: 40,
    height: 40,
    color: successcolor,
  },
  inputrow: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: inputbordercolor,
    borderTopWidth: 2,
    backgroundColor: elementbg,
    marginBottom: 20
  },


  tasksscrollview: {
    backgroundColor: rootbg,
  },
  taskrow: {
    borderColor: inputbordercolor,
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  taskdescription: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskswipe: {
    backgroundColor: elementbg,
  },
  taskscroller: {
    flexGrow: 1
  },
  tabbar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: inputbordercolor,
    backgroundColor: elementbgdark,
  },
  tabbartab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabbarbutton: {

  },
  tabbaricon: {
    color: lightgrey,
  },
  picker: {
    flex: 1
  },

  td6: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: inputbordercolor,
    backgroundColor: elementbg,
    flexDirection: 'row',
  },
  th6: {
    flex: 2,
    backgroundColor: elementbg,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    borderRightWidth: 2,
    borderColor: inputbordercolor,
    flexDirection: 'row'
  },
  td6rowBB: {
    borderBottomWidth: 1,
    borderColor: inputbordercolor,
  },
  td6text: {
    padding: 2,
  },
  th6text: {
    fontWeight: 'bold',
    alignItems: 'center',
  },
  td6row: {
    flexDirection: 'row',
    flex: 1,
  },

  greenbg : {
    backgroundColor: boxbg,
  },
  inventurButton: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
  },

  lirow: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: elementbg,
  },

  lirowBB: {
    borderBottomWidth: 1,
    borderColor: inputbordercolor,
  },
  lirowCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  lirowitem: {
    height: 40,
    justifyContent: 'center'
  },
  lirowtext: {
    paddingLeft: 10
  },
  inputmodalroot: {
    flexDirection: 'column',
    //height: 300,
    width: 250,
    marginTop: 0,
    backgroundColor: elementbgdarkened,
    borderRadius: 10,
    paddingTop: 10,

  },
  inputmodalrow: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputmodalhead: {
    fontWeight: 'bold'
  },
  inputmodalinput: {
    flex: 1,
    borderWidth: 1,
    borderColor: inputbordercolor,
    backgroundColor: elementbg,
    paddingLeft: 10,
    margin: 10,
    height: 50
  },
  inputmodalpicker: {
    flex: 1,
  },
  inputmodalpickeritem: {
    flex: 1
  },
  inputmodalsave: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: inputbordercolor,
    borderTopWidth: 1,
    alignItems: 'center',
    padding: 10
  },
  inputmodalcancel: {
    flex: 1,
    borderColor: inputbordercolor,
    borderTopWidth: 1,
    alignItems: 'center',
    padding: 10
  },

  textleft: {
    textAlign: 'left',
    flex: 1,
  },
  textright: {
    flex: 1,
    textAlign:'right'
  },


  navbarRightButton: {
    color: 'green',
    fontSize: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: -10
  }
});



export default styles;
