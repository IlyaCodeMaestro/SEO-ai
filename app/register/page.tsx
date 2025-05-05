// return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8">
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-medium">Регистрация</h2>
//         </div>

//         <p className="text-center text-gray-600 mb-8">Заполните все поля, чтобы создать аккаунт</p>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <AuthInput
//               icon="user"
//               type="text"
//               placeholder="Имя"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <PhoneInput value={phone} onChange={handlePhoneChange} required />
//           </div>

//           <div>
//             <AuthInput
//               icon="mail"
//               type="email"
//               placeholder="Электронная почта"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex items-center">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               checked={acceptTerms}
//               onChange={(e) => setAcceptTerms(e.target.checked)}
//             />
//             <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
//               Я принимаю{" "}
//               <a href="#" className="text-blue-600 hover:underline">
//                 Пользовательское соглашение
//               </a>
//             </label>
//           </div>

//           {error && <div className="text-red-500 text-sm text-center">{error}</div>}

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//             >
//               {isLoading ? "Загрузка..." : "Продолжить"}
//             </button>
//           </div>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             У Вас уже есть аккаунт?{" "}
//             <Link href="/login" className="text-blue-600 hover:underline">
//               Войдите
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
