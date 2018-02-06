import Vue from 'vue'
// import ElementUI from 'element-ui'
import {
  Row,
  Col,
  Button,
  Input,
  Radio,
  Menu,
  Submenu,
  MenuItem,
  Form,
  FormItem,
  Table,
  TableColumn,
  Popover,
  Carousel,
  CarouselItem,
  Card,
  Dialog,
  MessageBox,
  Message
} from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Card)
Vue.use(Dialog)
// Vue.use(ElementUI)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
