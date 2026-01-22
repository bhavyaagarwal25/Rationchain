import { useNavigate } from 'react-router-dom';
import { Button } from '../../app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../app/components/ui/card';
import { User, Store } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">Ration Distribution System</h1>
          <p className="text-gray-600">Select your role to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/client/login')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <User className="size-8 text-blue-600" />
                Client
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Access your ration card details and history</p>
              <Button className="w-full" size="lg">
                Continue as Client
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/shopkeeper')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Store className="size-8 text-green-600" />
                Shopkeeper
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage ration distribution and scanning</p>
              <Button className="w-full" size="lg" variant="outline">
                Continue as Shopkeeper
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
