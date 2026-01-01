import { useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Camera, 
  Upload, 
  MapPin, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  Brain,
  Send,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

type ReportStage = "upload" | "analyzing" | "review" | "submitted";

interface AnalysisResult {
  category: string;
  severity: string;
  department: string;
  sla: string;
  confidence: number;
}

const mockAnalysis: AnalysisResult = {
  category: "Infrastructure - Pothole",
  severity: "Medium",
  department: "Public Works Department",
  sla: "72 Hours",
  confidence: 94,
};

const Report = () => {
  const [stage, setStage] = useState<ReportStage>("upload");
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image || !description) {
      toast({
        title: "Missing Information",
        description: "Please upload an image and provide a description.",
        variant: "destructive",
      });
      return;
    }

    setStage("analyzing");
    
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    setAnalysis(mockAnalysis);
    setStage("review");
  };

  const handleSubmit = async () => {
    setStage("submitted");
    toast({
      title: "Report Submitted!",
      description: "Your issue has been logged and routed to the correct department.",
    });
  };

  const resetForm = () => {
    setStage("upload");
    setImage(null);
    setDescription("");
    setLocation("");
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="container max-w-3xl">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {["upload", "analyzing", "review", "submitted"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    stage === s
                      ? "bg-primary text-primary-foreground"
                      : ["upload", "analyzing", "review", "submitted"].indexOf(stage) > i
                      ? "bg-success text-success-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {["upload", "analyzing", "review", "submitted"].indexOf(stage) > i ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 3 && <div className="w-8 h-0.5 bg-border" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Stage 1: Upload */}
            {stage === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
                  <p className="text-muted-foreground">
                    Upload a photo and describe the problem — our AI handles the rest.
                  </p>
                </div>

                {/* Image Upload */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    image
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {image ? (
                    <div className="space-y-4">
                      <img
                        src={image}
                        alt="Uploaded issue"
                        className="max-h-64 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-muted-foreground">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <Camera className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Upload a photo</p>
                        <p className="text-sm text-muted-foreground">
                          Click to browse or drag and drop
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Describe the Issue
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Large pothole in the middle of the road. Been here for 3 days..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Location (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter address or use current location"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleAnalyze}
                  className="w-full"
                  size="lg"
                  variant="hero"
                >
                  <Brain className="h-5 w-5" />
                  Analyze with AI
                </Button>
              </motion.div>
            )}

            {/* Stage 2: Analyzing */}
            {stage === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Analyzing Your Report</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Our AI is identifying the issue type, severity, and the correct department to handle it...
                </p>
                
                <div className="mt-8 space-y-3 max-w-sm mx-auto text-left">
                  {[
                    "Processing image...",
                    "Identifying issue category...",
                    "Determining severity level...",
                    "Finding responsible department...",
                  ].map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.5 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-success" />
                      {step}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Stage 3: Review */}
            {stage === "review" && analysis && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Analysis Complete</h1>
                  <p className="text-muted-foreground">
                    Review the AI analysis and submit your report.
                  </p>
                </div>

                {/* Image Preview */}
                {image && (
                  <img
                    src={image}
                    alt="Issue"
                    className="w-full max-h-48 object-cover rounded-xl"
                  />
                )}

                {/* Analysis Results */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">AI Analysis</h3>
                    <span className="text-sm text-success font-medium">
                      {analysis.confidence}% Confidence
                    </span>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">{analysis.category}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Severity</span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/10 text-warning text-sm font-medium">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {analysis.severity}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Department</span>
                      <span className="font-medium">{analysis.department}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Expected Resolution</span>
                      <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                        <Clock className="h-4 w-4" />
                        {analysis.sla}
                      </span>
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4 text-sm">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Per City Charter §4.b:</strong> Potholes and road damage 
                      must be repaired within 72 hours of verified reporting.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                  >
                    Start Over
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    variant="hero"
                    className="flex-1"
                    size="lg"
                  >
                    <Send className="h-5 w-5" />
                    Submit Report
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Stage 4: Submitted */}
            {stage === "submitted" && (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="h-10 w-10 text-success" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Report Submitted!</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Your issue has been logged as <strong className="text-foreground">Ticket #CFX-2847</strong> and 
                  routed to the Public Works Department.
                </p>

                <div className="bg-card border border-border rounded-xl p-6 max-w-md mx-auto mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Expected Resolution</span>
                    <span className="text-primary font-semibold">Within 72 Hours</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[10%]" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Report received • Pending review</p>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button onClick={resetForm} variant="outline" size="lg">
                    Report Another Issue
                  </Button>
                  <Button asChild variant="hero" size="lg">
                    <a href="/track">Track This Report</a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Report;
