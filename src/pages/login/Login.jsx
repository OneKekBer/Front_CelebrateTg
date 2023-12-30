import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setStatus } from './../../store/auth/authSlice'
import CryptoJS from 'crypto-js'
const Login = () => {
   const dispatch = useDispatch()

   const [username, setUsername] = useState('')
   const [stage, setStage] = useState(1)
   const [verCode, setVerCode] = useState()
   const [trueVerCode, setTrueVerCode] = useState()
   const navigate = useNavigate()

   const handleStageOneSubmit = async (e) => {
      e.preventDefault()
      try {
         const res = await fetch(import.meta.env.VITE_URL + '/tg/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               // Add any other headers as needed

            },
            body: JSON.stringify({
               username: username
            })

         })
         const data = await res.json()
         if (data.status === 'ok') {

            console.log(data)
            const code = data.cryptedCode
            const secret = import.meta.env.VITE_CRYPTO_SECRET_KEY

            var bytes = CryptoJS.AES.decrypt(code, secret.toString())
            var verifyCode = bytes.toString(CryptoJS.enc.Utf8)

            console.log(verifyCode)
            setTrueVerCode(verifyCode)
            setStage(2)
         }
      } catch (error) {
         alert(error)
      }

   }

   const handleStageTwoSubmit = async (e) => {
      console.log(trueVerCode)
      e.preventDefault()
      if (+verCode === +trueVerCode) {
         navigate('/')
         dispatch(setStatus())
         console.log('you logged in successfully!!')
      } else {
         console.log('uncorrect verification code!!')
      }
   }

   return (
      <div>
         {stage === 1 &&
            <div>
               <form onSubmit={handleStageOneSubmit}>
                  <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder='введите ник в тг' />
                  <button type='submit'>отправить</button>
               </form>
            </div>
         }

         {stage === 2 &&
            <div>
               <form onSubmit={handleStageTwoSubmit}>
                  <input value={verCode} onChange={(e) => { setVerCode(e.target.value) }} type="text" placeholder='введите ник в тг' />
                  <button type='submit'>отправить</button>
               </form>
               <div onClick={() => { setStage(1) }}>back</div>
            </div>
         }

      </div>
   )
}

export default Login