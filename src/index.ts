import './styles/index.scss'
import App from './App'
import { readAllDocument } from './apis/document'

const app = new App('#root', {})

app.run()

//const workspaces = readAllDocument().then((data) => console.log(data))
