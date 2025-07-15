import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassmorphismCard({ children, className }: GlassmorphismCardProps) {
  return (
    <Card className={cn("glassmorphism-card border-0 shadow-xl p-6 rounded-3xl", className)}>
      {children}
    </Card>
  );
}
