
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
//         <h1 className="text-2xl font-medium text-center mb-12">Вход</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <User className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
//               placeholder="Логин или Электронная почта"
//               required
//             />
//           </div>

//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-full text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
//               placeholder="Пароль"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 flex items-center pr-3"
//             >
//               {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
//             </button>
//           </div>

//           {error && <div className="text-red-500 text-sm text-center">{error}</div>}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-2.5 px-4 bg-black text-white rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? "Вход..." : "Войти"}
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <Link href="/reset-password" className="text-sm text-gray-600 hover:underline">
//             Забыли пароль?
//           </Link>
//         </div>

//         <div className="mt-12 text-center">
//           <Link
//             href="/register"
//             className="inline-block py-2.5 px-6 bg-black text-white rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//           >
//             Зарегистрироваться
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }
