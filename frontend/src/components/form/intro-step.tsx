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
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-center text-muted-foreground">{message}</p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button 
            onClick={onStart}
            className="mt-4"
          >
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 