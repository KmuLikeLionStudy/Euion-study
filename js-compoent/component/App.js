import Component from "./src/Component.js";
import Items from "./components/Items.js";
import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";

const list_LS = "toDos";


export default class App extends Component {

    setup(){
        this.state = {
            isFilter:0,
            items:[
                {
                    li: "li",
                    div: "div",
                    delbtn:"button",
                },
            ],
            todoobj:[
                {
                    text: text,
                    id: listNum
                }
            ]
        };        
    }
    template (){
        return `
        <header data-component="item-appender"></header>
        <main data-component="items"></main>
        <footer data-component="item-filter"></footer>
        `
    }
    mounted(){
        const {  loadList, saveList, showingList, deleteList,  init, handleSubmit} = this;
        const theItemAppender = this.target.querySelector('[data-component="item-appender"]');
        const theItems = this.target.querySelector('[data-component="items"]');
        const theItemFilter = this.target.querySelector('[data-component="item-filter"]');

        new ItemAppender(theItemAppender, {
           showingList: showingList.bind(this) 
        });
        new Items(theItems,{
            loadList,
            deleteList:deleteList.bind(this),
            handleSubmit: handleSubmit.bind(this)

        });
        new ItemFilter(theItemFilter,{
            init: init.bind(this)
        });
    }
    
    deleteList (id) {
        const items = [ ...this.state.items ];
        items.splice(items.findIndex(v => v.id === id), 1);
        this.setState({items});
    }

    handleSubmit (id) {
        const items = [ ...this.state.items ];
        const index = items.findIndex(v => v.id === id);
        items[index].delbtn = !items[index].delbtn;
        this.setState({items});
    }

    loadList (isFilter) {
        this.setState({ isFilter });
    }
}