import { createApp } from 'vue'
import '@/styles/index.scss'
import App from '@/App.vue'
import { Ion } from 'cesium'

Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYmYwMDRlZS1iMDZiLTQ3NTktYTgyYi03M2JhMTIwZmJlOTciLCJpZCI6MzU2NDAsImlhdCI6MTY1ODI5NDYzMH0.Bi7SRpVgLbym0c0SXQhpM1a57mQtRV-waLb14PUkei8'

const app = createApp(App)
app.mount('#app')
