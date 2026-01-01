import { Camera, Brain, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Camera,
    title: "Snap a Photo",
    description: "Take a picture of the issue — pothole, broken light, garbage, or anything else.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Brain,
    title: "AI Analyzes",
    description: "Our AI instantly identifies the issue type, severity, and the correct department.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Send,
    title: "Auto-Routed",
    description: "Your complaint is automatically sent to the right city department with SLA info.",
    color: "bg-success/10 text-success",
  },
  {
    icon: CheckCircle,
    title: "Track & Resolve",
    description: "Monitor progress in real-time and get notified when the issue is fixed.",
    color: "bg-primary/10 text-primary",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How CivicFix Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Report city issues in seconds. Our AI handles the complexity so you don't have to.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-xl p-6 h-full border border-border shadow-card hover:shadow-lg transition-shadow duration-300">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
