
import type { ReactNode } from 'react';
import type { STM32Lesson } from '@/types';
import { Cpu, Settings, Puzzle, Plug, Bell, Radio, Network, GitBranch, ShieldQuestion, Timer, Rss, Waypoints, Dna, Code, FileCode, Unplug, Lock, ArrowUpFromDot } from 'lucide-react';

const toSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/^\d+\.\s*/, '')
    // Remove category prefixes like "Beginner:" for cleaner slugs
    .replace(/^(beginner:|intermediate:|programming:|advanced:)\s*/, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const comingSoonContent = <p>Content for this lesson is coming soon. Check back later!</p>;

export const stm32TutorialLessons: STM32Lesson[] = [
  // Beginner Basics
  { slug: toSlug("Introduction to STM32 and ARM Cortex-M"), title: "1. Beginner: Intro to STM32 & ARM Cortex-M", description: "Overview of the STM32 family and the ARM Cortex-M architecture.", Icon: Cpu, content: comingSoonContent },
  { slug: toSlug("Setting Up STM32CubeIDE and CubeMX"), title: "2. Beginner: Setting Up STM32CubeIDE", description: "A step-by-step guide to installing and configuring your development environment.", Icon: Settings, content: comingSoonContent },
  { slug: toSlug("Understanding STM32 Architecture and Memory Map"), title: "3. Beginner: STM32 Architecture & Memory Map", description: "Learn about the internal architecture and memory organization of STM32 MCUs.", Icon: Puzzle, content: comingSoonContent },
  { slug: toSlug("Using GPIO Digital Output LED Blinking"), title: "4. Beginner: GPIO Output (LED Blinking)", description: "Your first 'Hello World' project: blinking an LED using GPIO.", Icon: Plug, content: comingSoonContent },
  { slug: toSlug("Using GPIO Digital Input Button Press"), title: "5. Beginner: GPIO Input (Button Press)", description: "Learn to read digital inputs from buttons or switches.", Icon: Plug, content: comingSoonContent },
  { slug: toSlug("GPIO with Interrupts"), title: "6. Beginner: GPIO with Interrupts", description: "Efficiently handle external events using GPIO interrupts.", Icon: Bell, content: comingSoonContent },
  { slug: toSlug("System Clock Configuration HSE HSI PLL"), title: "7. Beginner: System Clock Configuration", description: "Understand and configure the clock sources (HSE, HSI, PLL).", Icon: Timer, content: comingSoonContent },
  { slug: toSlug("HAL vs LL vs Bare-metal vs CMSIS"), title: "8. Beginner: HAL vs LL vs Bare-metal", description: "Compare different programming approaches for STM32.", Icon: GitBranch, content: comingSoonContent },
  { slug: toSlug("Using Delay Functions HAL_Delay SysTick"), title: "9. Beginner: Delay Functions", description: "Learn to use HAL_Delay and understand its SysTick-based implementation.", Icon: Timer, content: comingSoonContent },

  // Intermediate Topics
  { slug: toSlug("Analog Inputs with ADC"), title: "10. Intermediate: Analog Inputs (ADC)", description: "Read analog sensors by converting analog signals to digital values.", Icon: Waypoints, content: comingSoonContent },
  { slug: toSlug("Pulse Width Modulation PWM with Timers"), title: "11. Intermediate: PWM with Timers", description: "Generate PWM signals for controlling servos, LEDs, and motors.", Icon: Waypoints, content: comingSoonContent },
  { slug: toSlug("Timers for Delay Timebase and Event Counting"), title: "12. Intermediate: Advanced Timers", description: "Use timers for precise delays, creating a timebase, and counting events.", Icon: Timer, content: comingSoonContent },
  { slug: toSlug("USART UART Serial Communication"), title: "13. Intermediate: UART Communication", description: "Master serial communication using polling, interrupt, and DMA methods.", Icon: Rss, content: comingSoonContent },
  { slug: toSlug("I2C Communication"), title: "14. Intermediate: I2C Communication", description: "Interface with devices like RTCs, OLEDs, and EEPROMs using the I2C protocol.", Icon: Rss, content: comingSoonContent },
  { slug: toSlug("SPI Communication"), title: "15. Intermediate: SPI Communication", description: "Communicate with high-speed peripherals like displays and sensors via SPI.", Icon: Rss, content: comingSoonContent },
  { slug: toSlug("DMA Memory Transfer"), title: "16. Intermediate: DMA (Direct Memory Access)", description: "Offload data transfer tasks from the CPU using DMA for peripherals like ADC and UART.", Icon: Waypoints, content: comingSoonContent },
  { slug: toSlug("External Interrupts EXTI NVIC"), title: "17. Intermediate: External Interrupts (EXTI)", description: "Configure external interrupts and manage priorities with the NVIC.", Icon: Bell, content: comingSoonContent },
  { slug: toSlug("Using NVIC for Interrupt Priority Grouping"), title: "18. Intermediate: NVIC Priority Grouping", description: "Understand and manage interrupt priority levels.", Icon: ShieldQuestion, content: comingSoonContent },
  { slug: toSlug("Watchdog Timers IWDG and WWDG"), title: "19. Intermediate: Watchdog Timers", description: "Implement system stability with Independent and Window Watchdog timers.", Icon: Timer, content: comingSoonContent },
  { slug: toSlug("Using the RTC Real Time Clock"), title: "20. Intermediate: Real Time Clock (RTC)", description: "Keep track of time and date even when the main power is off.", Icon: Timer, content: comingSoonContent },
  
  // Programming Concepts
  { slug: toSlug("Program Structure in STM32CubeIDE"), title: "21. Programming: Program Structure", description: "Understand the structure of a CubeIDE project (main.c, stm32xxxx_it.c).", Icon: FileCode, content: comingSoonContent },
  { slug: toSlug("Data Types and Memory Segments"), title: "22. Programming: Data Types & Memory", description: "Learn about memory segments (.data, .bss, .stack) in embedded C.", Icon: Dna, content: comingSoonContent },
  { slug: toSlug("Bit Manipulation in STM32 Registers"), title: "23. Programming: Bit Manipulation", description: "Directly manipulate peripheral registers using bitwise operations.", Icon: Code, content: comingSoonContent },
  { slug: toSlug("Creating and Using Custom HAL Libraries"), title: "24. Programming: Custom HAL Libraries", description: "Write reusable code by creating your own custom libraries.", Icon: FileCode, content: comingSoonContent },
  { slug: toSlug("Using Structures for Peripheral Configuration"), title: "25. Programming: Using Structs", description: "Organize peripheral configurations efficiently using C structures.", Icon: Dna, content: comingSoonContent },
  { slug: toSlug("Using Unions in Peripheral Drivers"), title: "26. Programming: Using Unions", description: "Understand and use unions for register access and data interpretation.", Icon: Dna, content: comingSoonContent },
  { slug: toSlug("Enumerations for Peripheral States"), title: "27. Programming: Using Enums", description: "Improve code readability with enumerations for peripheral states and modes.", Icon: Dna, content: comingSoonContent },
  { slug: toSlug("Preprocessor Directives for STM32"), title: "28. Programming: Preprocessor Directives", description: "Leverage #define, #ifdef, and other directives for flexible code.", Icon: Code, content: comingSoonContent },

  // Advanced Concepts
  { slug: toSlug("Introduction to FreeRTOS with STM32"), title: "29. Advanced: Intro to FreeRTOS", description: "Get started with a real-time operating system on your STM32.", Icon: Network, content: comingSoonContent },
  { slug: toSlug("Tasks Queues and Semaphores in FreeRTOS"), title: "30. Advanced: FreeRTOS Primitives", description: "Learn about essential FreeRTOS concepts: tasks, queues, and semaphores.", Icon: Network, content: comingSoonContent },
  { slug: toSlug("Multi-Tasking with Real-Time Scheduling"), title: "31. Advanced: FreeRTOS Multi-Tasking", description: "Implement concurrent tasks with real-time scheduling.", Icon: Network, content: comingSoonContent },
  { slug: toSlug("Low Power Modes Sleep Stop and Standby"), title: "32. Advanced: Low Power Modes", description: "Optimize your application for battery power using Sleep, Stop, and Standby modes.", Icon: Unplug, content: comingSoonContent },
  { slug: toSlug("Bootloaders Concepts and Custom Implementation"), title: "33. Advanced: Bootloaders", description: "Understand the concept of bootloaders and how to implement a custom one.", Icon: ArrowUpFromDot, content: comingSoonContent },
  { slug: toSlug("USB Communication CDC HID MSC"), title: "34. Advanced: USB Communication", description: "Implement USB device classes like CDC (Virtual COM Port), HID, and MSC.", Icon: Plug, content: comingSoonContent },
  { slug: toSlug("CAN Bus Communication"), title: "35. Advanced: CAN Bus Communication", description: "Interface with CAN bus for robust communication in automotive and industrial applications.", Icon: Network, content: comingSoonContent },
  { slug: toSlug("Ethernet and LwIP Stack"), title: "36. Advanced: Ethernet & LwIP", description: "Connect your STM32 to a wired network using the LwIP stack.", Icon: Network, content: comingSoonContent },
  { slug: toSlug("Firmware Over The Air FOTA Update"), title: "37. Advanced: FOTA Updates", description: "Implement firmware updates over the air via various communication protocols.", Icon: ArrowUpFromDot, content: comingSoonContent },
  { slug: toSlug("Secure Boot and Firmware Protection"), title: "38. Advanced: Secure Boot & TrustZone", description: "Explore security features like Secure Boot and TrustZone for protecting your firmware.", Icon: Lock, content: comingSoonContent },
];

export function getSTM32LessonBySlug(slug: string): STM32Lesson | undefined {
  return stm32TutorialLessons.find(lesson => lesson.slug === slug);
}
