import { 
  Camera, 
  MapPin, 
  Copy, 
  FileText, 
  AlertTriangle, 
  Shield 
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Camera,
    title: "Snap & Categorize",
    description: "Upload a photo and our AI automatically identifies the issue type, category, and severity.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: MapPin,
    title: "Smart Routing",
    description: "Semantic search matches your complaint to the correct department — no confusing dropdowns.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Copy,
    title: "Duplicate Detection",
    description: "AI finds similar reports nearby and upvotes existing tickets instead of creating duplicates.",
    gradient: "from-success/20 to-success/5",
  },
  {
    icon: FileText,
    title: "SLA Retrieval",
    description: "Get exact resolution timelines based on your City Charter rules — know your rights.",
    gradient: "from-warning/20 to-warning/5",
  },
  {
    icon: AlertTriangle,
    title: "Priority Heatmap",
    description: "Real-time analysis identifies high-priority zones and pushes critical alerts to officials.",
    gradient: "from-urgent/20 to-urgent/5",
  },
  {
    icon: Shield,
    title: "Transparent Tracking",
    description: "Monitor every step of your complaint from submission to resolution with full transparency.",
    gradient: "from-primary/20 to-primary/5",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            AI-Powered Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Intelligence at Every Step
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From image recognition to legal SLA retrieval, CivicFix uses advanced AI 
            to make civic reporting effortless and effective.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="bg-card rounded-xl p-6 h-full border border-border shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-foreground" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
