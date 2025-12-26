import { useTheme } from "@/components/theme-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@clerk/clerk-react";
import { Moon, Monitor, Sun } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex space-x-2 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "account" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("account")}
            className={cn(activeTab === "account" && "bg-background text-foreground shadow-sm")}
          >
            Account
          </Button>
          <Button
            variant={activeTab === "appearance" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("appearance")}
            className={cn(activeTab === "appearance" && "bg-background text-foreground shadow-sm")}
          >
            Appearance
          </Button>
        </div>

        {activeTab === "account" && (
          <div className="flex justify-center">
            <UserProfile routing="hash" />
          </div>
        )}

        {activeTab === "appearance" && (
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Select the theme for the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue={theme}
                onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                className="grid max-w-md grid-cols-3 gap-8 pt-2"
              >
                <div className="text-center">
                  <Label className="cursor-pointer">
                    <RadioGroupItem value="light" className="sr-only" />
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Sun className="h-4 w-4" />
                      <span className="block w-full font-normal">Light</span>
                    </div>
                  </Label>
                </div>

                <div className="text-center">
                  <Label className="cursor-pointer">
                    <RadioGroupItem value="dark" className="sr-only" />
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Moon className="h-4 w-4" />
                      <span className="block w-full font-normal">Dark</span>
                    </div>
                  </Label>
                </div>

                <div className="text-center">
                  <Label className="cursor-pointer">
                    <RadioGroupItem value="system" className="sr-only" />
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      <div className="flex h-full flex-col justify-center items-center bg-slate-100 dark:bg-slate-900 rounded-sm min-h-[100px]">
                        <Monitor className="h-10 w-10 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Monitor className="h-4 w-4" />
                      <span className="block w-full font-normal">System</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
