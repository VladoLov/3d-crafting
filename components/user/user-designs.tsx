"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileImage, Calendar, Download, Eye } from "lucide-react";
import Link from "next/link";

interface Design {
  id: string;
  name: string;
  type: string;
  fileUrl: string;
  thumbnailUrl: string | null;
  createdAt: Date;
  orderId: string | null;
}

interface UserDesignsProps {
  designs: Design[];
}

const designTypeLabels = {
  ENGRAVING: "Graviranje",
  CNC: "CNC",
  PRINT_3D: "3D ispis",
  WEDDING: "Vjenčanje",
};

export function UserDesigns({ designs }: UserDesignsProps) {
  if (designs.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileImage className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nemate dizajna</h3>
          <p className="text-muted-foreground text-center mb-4">
            Kada učitate dizajn, ovdje će se prikazati.
          </p>
          <Button asChild>
            <Link href="/upload">Učitaj dizajn</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {designs.map((design) => (
        <Card key={design.id}>
          <CardHeader className="pb-3">
            <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
              {design.thumbnailUrl ? (
                <img
                  src={design.thumbnailUrl || "/placeholder.svg"}
                  alt={design.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardTitle className="text-base truncate">{design.name}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(design.createdAt).toLocaleDateString("hr-HR")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <Badge variant="secondary">
                {designTypeLabels[design.type as keyof typeof designTypeLabels]}
              </Badge>

              {design.orderId && (
                <p className="text-sm text-muted-foreground">
                  Povezano s narudžbom #{design.orderId.slice(-8)}
                </p>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex-1 bg-transparent"
                >
                  <Link href={design.fileUrl} target="_blank">
                    <Eye className="h-4 w-4 mr-2" />
                    Pregled
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex-1 bg-transparent"
                >
                  <Link href={design.fileUrl} download>
                    <Download className="h-4 w-4 mr-2" />
                    Preuzmi
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
