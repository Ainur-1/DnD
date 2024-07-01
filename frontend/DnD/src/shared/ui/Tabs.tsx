import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabInfo {
    label: string,
    tabPanelChildren: React.ReactNode,
}

interface AppTabsProps {
    tabName: string,
    ariaLabel: string
    tabs: TabInfo[],
    defaultTab?: number
}

export default function AppTabs({tabName, tabs, ariaLabel, defaultTab=0}: AppTabsProps) {
  const [value, setValue] = React.useState(defaultTab);

  if (defaultTab >= tabs.length || defaultTab < 0) {
    throw new Error("Default tab is out of range.");
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getTabId = (index: number) => `${tabName}-tab-${index}`;

  const getTabPanelAriaControlName = (index: number) => `${tabName}-tabpanel-${index}`;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} 
              onChange={handleChange} 
              aria-label={ariaLabel} 
              textColor="secondary" 
              indicatorColor="secondary"
        >
            {
                tabs.map(({label}, index) => {
                    const id = getTabId(index);
                    return <Tab key={`${id}-tab`} 
                                label={label} 
                                id={id} 
                                aria-controls={getTabPanelAriaControlName(index)}
                            />
                })
            }
        </Tabs>
      </Box>
      {
        tabs.map(({tabPanelChildren}, index) => {
            const id = getTabId(index);
            return <div 
                    key={`${id}-tabPanel`}
                    role="tabpanel" 
                    hidden={value !== index} 
                    id={id} 
                    aria-labelledby={getTabPanelAriaControlName(index)}
                >
                    {value === index && <Box sx={{ p: 3 }}>{tabPanelChildren}</Box>}
                </div>
        })
      }
    </Box>
  );
}
