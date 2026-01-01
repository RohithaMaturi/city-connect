import { Button } from "@/components/ui/button";
import { Camera, ArrowRight, Shield, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { value: "50K+", label: "Issues Resolved" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24hr", label: "Avg. Response" },
];

const features = [
  { icon: Camera, label: "Snap & Report" },
  { icon: Shield, label: "AI-Powered" },
  { icon: Clock, label: "Fast Resolution" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.06),transparent_50%)]" />
      
      <div className="container relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              AI-Powered Civic Reporting
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Fix Your City,{" "}
              <span className="text-gradient">One Photo</span>{" "}
              at a Time
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Report potholes, broken lights, and more with just a photo. 
              Our AI instantly categorizes, routes, and tracks your complaint 
              to the right department.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button asChild variant="hero" size="xl">
                <Link to="/report">
                  <Camera className="h-5 w-5" />
                  Report an Issue
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/dashboard">
                  View Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative bg-card rounded-2xl shadow-card p-6 border border-border">
              {/* Preview Image Area */}
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">AI-powered issue detection</p>
                </div>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm"
                  >
                    <feature.icon className="h-4 w-4 text-primary" />
                    {feature.label}
                  </div>
                ))}
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute -right-4 top-8 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
              >
                ✓ Issue Categorized
              </motion.div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="absolute -left-4 -bottom-4 bg-card border border-border px-4 py-3 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">SLA: 72 Hours</div>
                    <div className="text-xs text-muted-foreground">Per City Charter §4.b</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
