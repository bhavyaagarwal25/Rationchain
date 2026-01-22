import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../app/components/ui/card';
import { Input } from '../../app/components/ui/input';
import { Label } from '../../app/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export function ClientLogin() {
  const navigate = useNavigate();
  const [rationCardId, setRationCardId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!rationCardId.trim()) {
      setError('Please enter your ration card ID');
      return;
    }

    const existingUser = localStorage.getItem(`user_${rationCardId}`);
    
    if (existingUser) {
      const userData = JSON.parse(existingUser);
      if (!userData.passwordSet) {
        navigate(`/client/setup-password?id=${rationCardId}`);
      } else {
        localStorage.setItem('currentUser', rationCardId);
        navigate('/client/dashboard');
      }
    } else {
      // New user - go to password setup
      navigate(`/client/setup-password?id=${rationCardId}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Button
            variant="ghost"
            size="sm"
            className="w-fit mb-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-2xl">Client Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rationCardId">Ration Card ID</Label>
              <Input
                id="rationCardId"
                placeholder="Enter your ration card ID"
                value={rationCardId}
                onChange={(e) => {
                  setRationCardId(e.target.value);
                  setError('');
                }}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
