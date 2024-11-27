import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

interface SuccessStepProps {
  title?: string;
  message?: string;
  buttonText?: string;
  redirectUrl?: string;
  onRedirect?: () => void;
}

export function SuccessStep({
  title = "Success! 🎉",
  message = "Your form has been submitted successfully.",
  buttonText = "Continue",
  redirectUrl,
  onRedirect
}: SuccessStepProps) {
  useEffect(() => {
    // Confetti animation effect
    const showConfetti = async () => {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    };
    showConfetti();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Rocket className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-center text-muted-foreground">{message}</p>
        </CardContent>

        {(redirectUrl || onRedirect) && (
          <CardFooter className="flex justify-center">
            <Button 
              onClick={onRedirect}
              className="mt-4"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}