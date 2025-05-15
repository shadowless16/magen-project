"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAlerts } from "@/services/api"

export function RecentAlerts() {
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAlerts()
      .then(setAlerts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>Your most recent security alerts and notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start space-x-4 rounded-md border p-3 ${
              alert.priority === "high" ? "border-red-500 bg-red-500/10" : "border-yellow-500 bg-yellow-500/10"
            }`}
          >
            <AlertTriangle className={`h-5 w-5 ${alert.priority === "high" ? "text-red-500" : "text-yellow-500"}`} />
            <div className="flex-1 space-y-1">
              <p className="font-medium leading-none">{alert.title}</p>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
              <p className="text-xs text-muted-foreground">{alert.date}</p>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full" asChild>
          <Link href="/alerts">View all alerts</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
