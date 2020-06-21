import React, {useState} from 'react'

const NeedToSignIn = () => {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <>
      {showAlert ? (
        <div
          className="bg-red-100 mx-64 mx-auto border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <h3 className="font-bold">Signed In a Guest</h3>
          <span className="block sm:inline">
            Either sign in or create an account to review this product
          </span>
          <button
            type="button"
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  )
}

export default NeedToSignIn
