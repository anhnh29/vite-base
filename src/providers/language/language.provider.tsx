import { ILanguage } from 'interfaces/language.interface'
import React, { ReactNode, useEffect, useState } from 'react'
import LanguageApiService from 'services/language.service'
const initialValue = {
  languages: [],
}
interface ILanguageContext {
  languages: ILanguage[]
}
interface LanguageContextProp {
  children: ReactNode
}
export const LanguageContext =
  React.createContext<ILanguageContext>(initialValue)
export default function LanguageContextProvider({
  children,
}: LanguageContextProp): JSX.Element {
  const [languages, setLanguage] = useState<ILanguage[]>([])
  useEffect(() => {
    LanguageApiService.getByPage({
      pagination: { page: 1, limit: 1000 },
    })
      .then((res) => {
        setLanguage(res.data)
      })
      .catch(() => {
        return []
      })
  }, [])

  return (
    <LanguageContext.Provider value={{ languages }}>
      {children}
    </LanguageContext.Provider>
  )
}
