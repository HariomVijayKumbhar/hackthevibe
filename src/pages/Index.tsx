import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, FileWarning, BookOpen, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const features = [
  { icon: FileWarning, title: 'Anonymous Reporting', description: 'Report ragging incidents safely and confidentially' },
  { icon: BookOpen, title: 'Cyber Awareness', description: 'Learn to protect yourself from online threats' },
  { icon: Users, title: 'Admin Dashboard', description: 'Efficient complaint management for authorities' },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-6">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Your Safety, Our Priority</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Creating Safer Campus Environments
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Report ragging incidents anonymously and learn essential cyber safety skills. Together, we build a safer campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full shadow-card hover:shadow-card-hover transition-shadow">
                  <CardContent className="pt-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help? We're Here For You</h2>
          <p className="text-muted-foreground mb-6">Anti-Ragging Helpline: 1800-180-5522 (24/7)</p>
          <Link to="/register">
            <Button size="lg">Report an Incident</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}