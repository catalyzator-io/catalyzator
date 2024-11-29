import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

interface IntroStepProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onStart: () => void;
}

export function IntroStep({
  title = "Welcome",
  message = "Please take a moment to complete this form.",
  buttonText = "Start",
  onStart
}: IntroStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-900 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-crazy-orange/80 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-crazy-orange/10 p-4">
              <FileText className="h-12 w-12 text-crazy-orange" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-black">{title}</h2>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-center text-gray-600">{message}</p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button 
            onClick={onStart}
            className="bg-crazy-orange text-white hover:bg-crazy-orange/90 mt-4"
          >
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 