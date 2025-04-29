'use client';

import * as React from 'react';
import { PROTOCOL_FAILURES } from '@/app/data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Info } from 'lucide-react';

export function ProtocolFailures() {
  const [open, setOpen] = React.useState(false);
  const [selectedFailure, setSelectedFailure] = React.useState(PROTOCOL_FAILURES[0]);

  const handleFailureClick = (failure: typeof PROTOCOL_FAILURES[0]) => {
    setSelectedFailure(failure);
    setOpen(true);
  };

  return (
    <Card className='bg-white dark:bg-zinc-900 shadow-sm'>
      <CardHeader>
        <CardTitle className="text-lg font-medium tracking-tight text-zinc-900 dark:text-white">
          Core Protocol Failures
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROTOCOL_FAILURES.map((failure, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              key={failure.id}
              onClick={() => handleFailureClick(failure)}
              className="relative overflow-hidden rounded-lg p-4 cursor-pointer transition-all duration-200 ease-in-out hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800/50 group h-[180px] flex flex-col"
            >
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Info size={16} className="text-zinc-400 dark:text-zinc-500" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="font-medium text-zinc-900 dark:text-white pr-6">
                  {failure.title}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {failure.date} • {failure.duration}
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2 flex-1">
                  {failure.description}
                </p>
                <div className="mt-auto text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <span>Click to read more</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md md:max-w-2xl dark:bg-zinc-900 dark:border-zinc-800 p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 300,
                mass: 0.8,
                duration: 0.2
              }}
              className="p-6"
            >
              <DialogHeader>
                <DialogTitle className="text-xl text-zinc-900 dark:text-white">
                  {selectedFailure.title}
                </DialogTitle>
                <div className="flex items-center space-x-2 mt-1 mb-2">
                  <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    {selectedFailure.date}
                  </div>
                  <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    Outage Duration: {selectedFailure.duration}
                  </div>
                </div>
                <DialogDescription className="text-zinc-700 dark:text-zinc-300 mt-2">
                  {selectedFailure.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed space-y-4">
                <p>{selectedFailure.details}</p>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
} 