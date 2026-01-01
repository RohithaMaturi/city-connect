import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  FileText,
  User,
  Building,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: typeof CheckCircle;
  status: "completed" | "current" | "pending";
}

const mockTimeline: TimelineEvent[] = [
  {
    id: "1",
    title: "Report Submitted",
    description: "Your complaint was received and logged in the system.",
    timestamp: "Jan 1, 2026 at 10:32 AM",
    icon: FileText,
    status: "completed",
  },
  {
    id: "2",
    title: "AI Analysis Complete",
    description: "Issue identified as Infrastructure - Pothole. Severity: Medium.",
    timestamp: "Jan 1, 2026 at 10:33 AM",
    icon: CheckCircle,
    status: "completed",
  },
  {
    id: "3",
    title: "Routed to Department",
    description: "Assigned to Public Works Department for review.",
    timestamp: "Jan 1, 2026 at 10:35 AM",
    icon: Building,
    status: "completed",
  },
  {
    id: "4",
    title: "Under Review",
    description: "A field officer has been assigned to inspect the location.",
    timestamp: "Jan 1, 2026 at 2:15 PM",
    icon: User,
    status: "current",
  },
  {
    id: "5",
    title: "Work in Progress",
    description: "Repair work scheduled to begin.",
    timestamp: "Pending",
    icon: Clock,
    status: "pending",
  },
  {
    id: "6",
    title: "Issue Resolved",
    description: "Repair completed and verified.",
    timestamp: "Pending",
    icon: CheckCircle,
    status: "pending",
  },
];

const TrackStatus = () => {
  const [ticketId, setTicketId] = useState("CFX-2847");
  const [isTracking, setIsTracking] = useState(true);

  const handleTrack = () => {
    if (ticketId.trim()) {
      setIsTracking(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="container max-w-4xl">
          {/* Search Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Track Your Report</h1>
            <p className="text-muted-foreground mb-6">
              Enter your ticket ID to see real-time status updates.
            </p>

            <div className="flex gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  placeholder="Enter Ticket ID (e.g., CFX-2847)"
                  className="pl-10"
                />
              </div>
              <Button onClick={handleTrack} variant="hero">
                Track
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isTracking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Ticket Summary Card */}
              <div className="bg-card rounded-xl border border-border shadow-card p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-lg font-bold text-primary">
                        {ticketId}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <Clock className="h-3 w-3" />
                        In Progress
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-1">
                      Large pothole on Main Street
                    </h2>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      123 Main Street, Sector 5
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">
                      Expected Resolution
                    </div>
                    <div className="text-lg font-semibold text-primary">
                      Jan 4, 2026
                    </div>
                    <div className="text-xs text-muted-foreground">
                      (Within 72 hours per SLA)
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full w-[60%] transition-all duration-500" />
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">Department</span>
                  </div>
                  <div className="font-medium">Public Works</div>
                </div>
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    </div>
                    <span className="text-sm text-muted-foreground">Severity</span>
                  </div>
                  <div className="font-medium">Medium Priority</div>
                </div>
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-sm text-muted-foreground">Supporters</span>
                  </div>
                  <div className="font-medium">12 neighbors</div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-card rounded-xl border border-border shadow-card p-6">
                <h3 className="text-lg font-semibold mb-6">Activity Timeline</h3>
                
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                  <div className="space-y-6">
                    {mockTimeline.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex gap-4 pl-10"
                      >
                        {/* Icon */}
                        <div
                          className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                            event.status === "completed"
                              ? "bg-success border-success text-success-foreground"
                              : event.status === "current"
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-secondary border-border text-muted-foreground"
                          }`}
                        >
                          <event.icon className="h-4 w-4" />
                        </div>

                        {/* Content */}
                        <div className={`flex-1 ${event.status === "pending" ? "opacity-50" : ""}`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <span className="text-xs text-muted-foreground">
                              {event.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" size="lg">
                  <MessageSquare className="h-4 w-4" />
                  Add Comment
                </Button>
                <Button variant="hero" size="lg">
                  <ArrowRight className="h-4 w-4" />
                  Upvote This Issue
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackStatus;
