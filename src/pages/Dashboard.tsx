import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Filter,
  Search,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

interface Issue {
  id: string;
  title: string;
  category: string;
  location: string;
  status: "pending" | "in-progress" | "resolved";
  severity: "low" | "medium" | "high" | "critical";
  reportedAt: string;
  department: string;
  votes: number;
}

const mockIssues: Issue[] = [
  {
    id: "CFX-2847",
    title: "Large pothole on Main Street",
    category: "Infrastructure",
    location: "123 Main Street, Sector 5",
    status: "in-progress",
    severity: "medium",
    reportedAt: "2 hours ago",
    department: "Public Works",
    votes: 12,
  },
  {
    id: "CFX-2845",
    title: "Broken streetlight near park",
    category: "Electrical",
    location: "City Park, North Entrance",
    status: "pending",
    severity: "high",
    reportedAt: "5 hours ago",
    department: "Electrical Dept",
    votes: 8,
  },
  {
    id: "CFX-2842",
    title: "Garbage not collected for 3 days",
    category: "Sanitation",
    location: "Block 4, Residential Area",
    status: "resolved",
    severity: "medium",
    reportedAt: "1 day ago",
    department: "Sanitation",
    votes: 24,
  },
  {
    id: "CFX-2839",
    title: "Open manhole cover missing",
    category: "Infrastructure",
    location: "Market Road, Near Bus Stop",
    status: "in-progress",
    severity: "critical",
    reportedAt: "1 day ago",
    department: "Public Works",
    votes: 45,
  },
  {
    id: "CFX-2835",
    title: "Water logging after rain",
    category: "Drainage",
    location: "Sector 7, Main Junction",
    status: "pending",
    severity: "medium",
    reportedAt: "2 days ago",
    department: "Stormwater Dept",
    votes: 18,
  },
];

const stats = [
  { label: "Total Reports", value: "1,247", icon: FileText, change: "+12%" },
  { label: "Resolved", value: "892", icon: CheckCircle, change: "+8%" },
  { label: "In Progress", value: "289", icon: Clock, change: "-3%" },
  { label: "Active Citizens", value: "5.2K", icon: Users, change: "+15%" },
];

const statusColors = {
  pending: "bg-warning/10 text-warning",
  "in-progress": "bg-primary/10 text-primary",
  resolved: "bg-success/10 text-success",
};

const severityColors = {
  low: "bg-secondary text-secondary-foreground",
  medium: "bg-warning/10 text-warning",
  high: "bg-accent/10 text-accent",
  critical: "bg-urgent/10 text-urgent",
};

const Dashboard = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIssues = mockIssues.filter((issue) => {
    if (filter !== "all" && issue.status !== filter) return false;
    if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time overview of city issues and resolutions
              </p>
            </div>
            <Button variant="hero">
              <BarChart3 className="h-4 w-4" />
              Export Report
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border shadow-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-success flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Priority Heatmap Placeholder */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-card mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Priority Zones</h2>
              <span className="text-xs text-muted-foreground">Updated 5 min ago</span>
            </div>
            <div className="aspect-[2.5/1] rounded-lg bg-gradient-to-br from-primary/5 via-warning/10 to-urgent/5 flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
                <p className="text-muted-foreground">Interactive heatmap visualization</p>
                <p className="text-sm text-muted-foreground">Showing high-priority zones in Sector 4, 7</p>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Low Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-muted-foreground">Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-urgent" />
                <span className="text-muted-foreground">High Priority</span>
              </div>
            </div>
          </div>

          {/* Issues Table */}
          <div className="bg-card rounded-xl border border-border shadow-card">
            <div className="p-4 border-b border-border">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search issues..."
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  {["all", "pending", "in-progress", "resolved"].map((status) => (
                    <Button
                      key={status}
                      variant={filter === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter(status)}
                      className="capitalize"
                    >
                      {status === "all" ? "All" : status.replace("-", " ")}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Issue</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Location</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Severity</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.map((issue, index) => (
                    <motion.tr
                      key={issue.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer"
                    >
                      <td className="p-4">
                        <span className="font-mono text-sm text-primary">{issue.id}</span>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium mb-1">{issue.title}</div>
                          <div className="text-xs text-muted-foreground">{issue.category} • {issue.reportedAt}</div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {issue.location}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[issue.status]}`}>
                          {issue.status === "resolved" && <CheckCircle className="h-3 w-3" />}
                          {issue.status === "in-progress" && <Clock className="h-3 w-3" />}
                          {issue.status === "pending" && <AlertTriangle className="h-3 w-3" />}
                          {issue.status.replace("-", " ")}
                        </span>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${severityColors[issue.severity]}`}>
                          {issue.severity}
                        </span>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <span className="text-sm font-medium">{issue.votes}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredIssues.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">No issues found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
