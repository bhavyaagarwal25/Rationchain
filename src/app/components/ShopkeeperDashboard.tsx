import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserMultiFormatReader } from '@zxing/library';
import { Button } from '../../app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../app/components/ui/card';
import { Input } from '../../app/components/ui/input';
import { Label } from '../../app/components/ui/label';
import { ArrowLeft, Camera, CameraOff, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function ShopkeeperDashboard() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scannedId, setScannedId] = useState('');
  const [rationType, setRationType] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
  codeReaderRef.current = new BrowserMultiFormatReader()

  return () => {
    codeReaderRef.current?.reset()
  }
}, [])

  const startScanning = async () => {
    if (!codeReaderRef.current || !videoRef.current) return;

    try {
      setScanning(true);
      const videoInputDevices = await codeReaderRef.current.listVideoInputDevices();
      
      if (videoInputDevices.length === 0) {
        toast.error('No camera found');
        setScanning(false);
        return;
      }

      codeReaderRef.current.decodeFromVideoDevice(
        videoInputDevices[0].deviceId,
        videoRef.current,
        (result) => {
          if (result) {
            setScannedId(result.getText());
            stopScanning();
            toast.success('QR Code scanned successfully!');
          }
        }
      );
    } catch (error) {
      console.error('Error starting scanner:', error);
      toast.error('Failed to start camera');
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    setScanning(false);
  };

  const handleSubmit = () => {
    if (!scannedId || !rationType || !quantity) {
      toast.error('Please fill all fields');
      return;
    }

    // Get user data
    const userData = localStorage.getItem(`user_${scannedId}`);
    
    if (!userData) {
      toast.error('User not found');
      return;
    }

    const user = JSON.parse(userData);
    
    // Add to history
    const newEntry = {
      date: new Date().toLocaleDateString('en-IN'),
      type: rationType,
      quantity: quantity
    };

    user.history = user.history || [];
    user.history.unshift(newEntry);

    // Save updated user data
    localStorage.setItem(`user_${scannedId}`, JSON.stringify(user));

    toast.success('Ration distributed successfully!');
    
    // Reset form
    setScannedId('');
    setRationType('');
    setQuantity('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl">Shopkeeper Dashboard</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Scanner Card */}
          <Card>
            <CardHeader>
              <CardTitle>QR Code Scanner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative bg-black rounded-lg overflow-hidden aspect-square">
                  {scanning ? (
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <Camera className="size-16 opacity-50" />
                    </div>
                  )}
                </div>

                {!scanning ? (
                  <Button onClick={startScanning} className="w-full">
                    <Camera className="size-4 mr-2" />
                    Start Scanning
                  </Button>
                ) : (
                  <Button onClick={stopScanning} variant="destructive" className="w-full">
                    <CameraOff className="size-4 mr-2" />
                    Stop Scanning
                  </Button>
                )}

                {scannedId && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">Scanned ID: <span className="font-medium">{scannedId}</span></p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Distribution Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>Distribution Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rationId">Ration Card ID</Label>
                  <Input
                    id="rationId"
                    placeholder="Scan QR or enter manually"
                    value={scannedId}
                    onChange={(e) => setScannedId(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rationType">Ration Type</Label>
                  <Input
                    id="rationType"
                    placeholder="e.g., Rice, Wheat, Sugar"
                    value={rationType}
                    onChange={(e) => setRationType(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 10 kg"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <CheckCircle className="size-4 mr-2" />
                  Submit Distribution
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-800">
              <strong>Instructions:</strong> Scan the client's QR code or enter their ration card ID manually. 
              Fill in the type and quantity of ration being distributed, then submit to update their history.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
