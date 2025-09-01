"use client"

import React, { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { componentStyles } from "@/lib/design-system"

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
}

export const Tabs = React.memo(({ tabs, defaultTab }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeTabContent = useMemo(() => tabs.find((tab) => tab.id === activeTab)?.content, [tabs, activeTab])

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className={componentStyles.tab.container}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              componentStyles.tab.button,
              activeTab === tab.id ? componentStyles.tab.active : componentStyles.tab.inactive,
            )}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8" role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {activeTabContent}
      </div>
    </div>
  )
})

Tabs.displayName = "Tabs"
