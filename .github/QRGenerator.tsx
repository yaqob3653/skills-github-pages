import { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, QrCode, Palette, Square, Circle, Dot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QRGenerator = () => {
  const [input, setInput] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [foregroundColor, setForegroundColor] = useState('#6366f1');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [qrStyle, setQrStyle] = useState('square');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQR = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL or text",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        const options = {
          width: 400,
          margin: 2,
          color: {
            dark: foregroundColor,
            light: backgroundColor
          },
          errorCorrectionLevel: 'M' as const
        };

        await QRCode.toCanvas(canvas, input, options);
        
        const dataUrl = canvas.toDataURL('image/png');
        setQrCodeUrl(dataUrl);
        
        toast({
          title: "Success!",
          description: "QR code generated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = (format: 'png' | 'svg' = 'png') => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = `qr-code.${format}`;
    link.href = qrCodeUrl;
    link.click();
    
    toast({
      title: "Downloaded",
      description: `QR code downloaded as ${format.toUpperCase()}`,
    });
  };

  const presetColors = [
    { name: 'Purple', color: '#6366f1' },
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Green', color: '#10b981' },
    { name: 'Red', color: '#ef4444' },
    { name: 'Orange', color: '#f97316' },
    { name: 'Pink', color: '#ec4899' },
    { name: 'Black', color: '#000000' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Main QR Generator Card */}
      <Card className="border-0 shadow-qr backdrop-blur-sm bg-glass border border-glass-border">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-display font-bold bg-qr-gradient bg-clip-text text-transparent">
            QR Code Generator
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            Create beautiful, customizable QR codes instantly
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="url-input" className="text-base font-medium">
              Enter URL or Text
            </Label>
            <Input
              id="url-input"
              type="text"
              placeholder="https://example.com or any text..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-12 text-lg"
              onKeyPress={(e) => e.key === 'Enter' && generateQR()}
              aria-label="Enter URL or text to generate QR code"
            />
          </div>

          {/* Customization Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Color Customization */}
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Colors
              </Label>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="fg-color" className="text-sm">Foreground</Label>
                  <div className="flex gap-2 mt-1">
                    <input
                      id="fg-color"
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="flex-1 h-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bg-color" className="text-sm">Background</Label>
                  <div className="flex gap-2 mt-1">
                    <input
                      id="bg-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 h-10"
                    />
                  </div>
                </div>
              </div>

              {/* Color Presets */}
              <div className="flex flex-wrap gap-2">
                {presetColors.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setForegroundColor(preset.color)}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: preset.color }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>

            {/* Style Options */}
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2">
                <Square className="h-4 w-4" />
                Style
              </Label>
              <Select value={qrStyle} onValueChange={setQrStyle}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">
                    <div className="flex items-center gap-2">
                      <Square className="h-4 w-4" />
                      Square
                    </div>
                  </SelectItem>
                  <SelectItem value="rounded">
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4" />
                      Rounded
                    </div>
                  </SelectItem>
                  <SelectItem value="dots">
                    <div className="flex items-center gap-2">
                      <Dot className="h-4 w-4" />
                      Dots
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <Button
                onClick={generateQR}
                disabled={isGenerating || !input.trim()}
                className="w-full h-12 text-lg font-semibold bg-qr-gradient hover:opacity-90 transition-all duration-300 hover:scale-105"
                aria-label="Generate QR Code"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <QrCode className="h-5 w-5 mr-2" />
                    Generate QR Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated QR Code Display */}
      {qrCodeUrl && (
        <Card className="border-0 shadow-qr backdrop-blur-sm bg-glass border border-glass-border animate-fade-in-up">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <canvas
                  ref={canvasRef}
                  className="border rounded-xl shadow-qr-glow animate-glow-pulse"
                  style={{ display: qrCodeUrl ? 'none' : 'block' }}
                />
                {qrCodeUrl && (
                  <img
                    src={qrCodeUrl}
                    alt={`Generated QR Code for: ${input}`}
                    className="border rounded-xl shadow-qr-glow animate-glow-pulse max-w-full mx-auto"
                    style={{ maxWidth: '400px' }}
                  />
                )}
              </div>
              
              <div className="flex gap-3 justify-center flex-wrap">
                <Button
                  onClick={() => downloadQR('png')}
                  variant="outline"
                  className="bg-card hover:bg-accent transition-all duration-300 hover:scale-105"
                  aria-label="Download QR code as PNG image"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PNG
                </Button>
                <Button
                  onClick={() => downloadQR('svg')}
                  variant="outline"
                  className="bg-card hover:bg-accent transition-all duration-300 hover:scale-105"
                  aria-label="Download QR code as SVG image"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download SVG
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default QRGenerator;