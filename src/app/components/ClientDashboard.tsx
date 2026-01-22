import { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../app/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../app/components/ui/select'
import { LogOut, User, MapPin, CreditCard, History } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchRationStatus } from '../../features/ledger/ledger.thunk'

type Language = 'en' | 'hi'





const translations = {
  en: {
    dashboard: 'Client Dashboard',
    profile: 'Profile',
    rationCardId: 'Ration Card ID',
    name: 'Name',
    address: 'Address',
    history: 'Distribution History',
    noHistory: 'No distribution history available',
    date: 'Date',
    quantity: 'Quantity',
    logout: 'Logout',
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी'
  },
  hi: {
    dashboard: 'क्लाइंट डैशबोर्ड',
    profile: 'प्रोफ़ाइल',
    rationCardId: 'राशन कार्ड आईडी',
    name: 'नाम',
    address: 'पता',
    history: 'वितरण इतिहास',
    noHistory: 'कोई वितरण इतिहास उपलब्ध नहीं है',
    date: 'तारीख',
    quantity: 'मात्रा',
    logout: 'लॉग आउट',
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी'
  }
}


export function ClientDashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.user.user)
  const loading = useAppSelector(state => state.ledger.loading)

  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
  const currentUser = localStorage.getItem('currentUser')
  if (!currentUser) {
    navigate('/client/login')
    return
  }

  dispatch(fetchRationStatus(currentUser))
}, [dispatch, navigate]) 



  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/')
  }

  if (loading || !user) {
    return <p className="text-center mt-10">Loading...</p>
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto py-8">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl">{t.dashboard}</h1>

          <div className="flex gap-3">
            <Select value={language} onValueChange={(v: string) => handleLanguageChange(v as Language)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder={t.language} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t.english}</SelectItem>
                <SelectItem value="hi">{t.hindi}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="size-4 mr-2" />
              {t.logout}
            </Button>
          </div>
        </div>

        {/* Profile */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-5" />
              {t.profile}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Info label={t.rationCardId} value={user.rationCardId} icon={<CreditCard />} />
            <Info label={t.name} value={user.name} icon={<User />} />
            <Info label={t.address} value={user.address} icon={<MapPin />} />
          </CardContent>
        </Card>

        {/* History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="size-5" />
              {t.history}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.history.length > 0 ? (
              <div className="space-y-3">
                {user.history.map((item, i) => (
                  <div key={i} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.type}</p>
                      <p className="text-sm text-gray-600">{t.date}: {item.date}</p>
                    </div>
                    <p className="font-medium">{item.quantity}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">{t.noHistory}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Info({ label, value, icon }: { label: string; value: string; icon: JSX.Element }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      {icon}
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}
