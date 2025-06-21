
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
  { slug: toSlug("Intro to STM32 & ARM Cortex-M"), title: "1. Intro to STM32 & ARM Cortex-M", description: "Overview of the STM32 family and the ARM Cortex-M architecture.", Icon: Cpu, content: comingSoonContent },
  { slug: toSlug("Setting Up STM32CubeIDE"), title: "2. Setting Up STM32CubeIDE", description: "A step-by-step guide to installing and configuring your development environment.", Icon: Settings, content: comingSoonContent },
  { slug: toSlug("STM32 Architecture & Memory Map"), title: "3. STM32 Architecture & Memory Map", description: "Learn about the internal architecture and memory organization of STM32 MCUs.", Icon: Puzzle, content: comingSoonContent },
  { slug: toSlug("GPIO Output (LED Blinking)"), title: "4. GPIO Output (LED Blinking)", description: "Your first 'Hello World' project: blinking an LED using GPIO.", Icon: Plug, content: comingSoonContent },
  { slug: toSlug("GPIO Input (Button Press)"), title: "5. GPIO Input (Button Press)", description: "Learn to read digital inputs from buttons or switches.", Icon: Plug, content: comingSoonContent },
  { slug: toSlug("GPIO with Interrupts"), title: "6. GPIO with Interrupts", description: "Efficiently handle external events using GPIO interrupts.", Icon: Bell, content: comingSoonContent },
  { slug: toSlug("System Clock Configuration"), title: "7. System Clock Configuration", description: "Understand and configure the clock sources (HSE, HSI, PLL).", Icon: Timer, content: comingSoonContent },
  { slug: toSlug("HAL vs LL vs Bare-metal"), title: "8. HAL vs LL vs Bare-metal", description: "Compare different programming approaches for STM32.", Icon: GitBranch, content: comingSoonContent },
  { slug: toSlug("Delay Functions"), title: "9. Delay Functions", description: "Learn to use HAL_Delay and understand its SysTick-based implementation.", Icon: Timer, content: comingSoonContent },

  // Intermediate Topics
  { slug: toSlug("Analog Inputs (ADC)"), title: "10. Analog Inputs (ADC)", description: "Read analog sensors by converting analog signals to digital values.", Icon: Waypoints, content: comingSoonContent },
  { slug: toSlug("PWM with Timers"), title: "11. PWM with Timers", description: "Generate PWM signals for controlling servos, LEDs, and motors.", Icon: Waypoints, content: comingSoonContent },
  { slug: toSlug("Advanced Timers"), title: "12. Advanced Timers", description: "Use timers for precise delays, creating a timebase, and counting events.", Icon: Timer, content: comingSoonContent },
  { slug: toSlug("UART Communication"), title: "13. UART Communication", description: "Master serial communication using polling, interrupt, and DMA methods.", Icon: Rss, content: comingSoonContent },
  { slug: toSlug("I2C Communication"), title: "14. I2C Communication", description: "Interface with devices like RTCs, OLEDs, and EEPROMs using the I2C protocol.", Icon: Rss, content: comingSoonContent },
  { slug: toSlug("SPI Communication"), title: "15. SPI Communication", description: "Communicate with high-speed peripherals like displays and sensors via SPI.", Icon: Rss, content: comingSoonContent },
  { slug: toSlug("DMA (Direct Memory Access)"), title: "16. DMA (Direct Memory Access)", description: "Offload data transfer tasks from the CPU using DMA for peripherals like ADC and UART.", Icon: Waypoints, content: comingSoonContent },
  { slug: toSlug("External Interrupts (EXTI)"), title: "17. External Interrupts (EXTI)", description: "Configure external interrupts and manage priorities with the NVIC.", Icon: Bell, content: comingSoonContent },
  { slug: toSlug("NVIC Priority Grouping"), title: "18. NVIC Priority Grouping", description: "Understand and manage interrupt priority levels.", Icon: ShieldQuestion, content: comingSoonContent },
  { slug: toSlug("Watchdog Timers"), title: "19. Watchdog Timers", description: "Implement system stability with Independent and Window Watchdog timers.", Icon: Timer, content: comingSoonContent },
  { slug: toSlug("Real Time Clock (RTC)"), title: "20. Real Time Clock (RTC)", description: "Keep track of time and date even when the main power is off.", Icon: Timer, content: comingSoonContent },
  
  // Programming Concepts
  { slug: toSlug("Program Structure"), title: "21. Program Structure", description: "Understand the structure of a CubeIDE project (main.c, stm32xxxx_it.c).", Icon: FileCode, content: comingSoonContent },
  { slug: toSlug("Data Types & Memory"), title: "22. Data Types & Memory", description: "Learn about memory segments (.data, .bss, .stack) in embedded C.", Icon: Dna, content: comingSoonContent },
  { slug: toSlug("Bit Manipulation"), title: "23. Bit Manipulation", description: "Directly manipulate peripheral registers using bitwise operations.", Icon: Code, content: comingSoonContent },
  { slug: toSlug("Custom HAL Libraries"), title: "24. Custom HAL Libraries", description: "Write reusable code by creating your own custom libraries.", Icon: FileCode, content: comingSoonContent },
  { slug: toSlug("Using Structs"), title: "25. Using Structs", description: "Organize peripheral configurations efficiently using C structures.", Icon: Dna, content: comingSoonContent },
  { slug: toSlug("Using Unions"), title: "26. Using Unions", description: "Understand and use unions for register access and data interpretation.", Icon: Dna, content: comingSoonContent },
  { slug: toSlug("Using Enums"), title: "27. Using Enums", description: "Improve code readability with enumerations for peripheral states and modes.", Icon: Dna, content: comingSoonContent },
  { slug: toSlug("Preprocessor Directives"), title: "28. Preprocessor Directives", description: "Leverage #define, #ifdef, and other directives for flexible code.", Icon: Code, content: comingSoonContent },

  // Advanced Concepts
  { slug: toSlug("Intro to FreeRTOS"), title: "29. Intro to FreeRTOS", description: "Get started with a real-time operating system on your STM32.", Icon: Network, content: comingSoonContent },
  { slug: toSlug("FreeRTOS Primitives"), title: "30. FreeRTOS Primitives", description: "Learn about essential FreeRTOS concepts: tasks, queues, and semaphores.", Icon: Network, content: comingSoonContent },
  { slug: toSlug("FreeRTOS Multi-Tasking"), title: "31. FreeRTOS Multi-Tasking", description: "Implement concurrent tasks with real-time scheduling.", Icon: Network, content: comingSoonContent },
  { slug: toSlug("Low Power Modes"), title: "32. Low Power Modes", description: "Optimize your application for battery power using Sleep, Stop, and Standby modes.", Icon: Unplug, content: comingSoonContent },
  { slug: toSlug("Bootloaders"), title: "33. Bootloaders", description: "Understand the concept of bootloaders and how to implement a custom one.", Icon: ArrowUpFromDot, content: comingSoonContent },
  { slug: toSlug("USB Communication"), title: "34. USB Communication", description: "Implement USB device classes like CDC (Virtual COM Port), HID, and MSC.", Icon: Plug, content: comingSoonContent },
  { slug: toSlug("CAN Bus Communication"), title: "35. CAN Bus Communication", description: "Interface with CAN bus for robust communication in automotive and industrial applications.", Icon: Network, content: comingSoonContent },
  { slug: toSlug("Ethernet & LwIP"), title: "36. Ethernet & LwIP", description: "Connect your STM32 to a wired network using the LwIP stack.", Icon: Network, content: comingSoonContent },
  { slug: toSlug("FOTA Updates"), title: "37. FOTA Updates", description: "Implement firmware updates over the air via various communication protocols.", Icon: ArrowUpFromDot, content: comingSoonContent },
  { slug: toSlug("Secure Boot & TrustZone"), title: "38. Secure Boot & TrustZone", description: "Explore security features like Secure Boot and TrustZone for protecting your firmware.", Icon: Lock, content: comingSoonContent },
];

export function getSTM32LessonBySlug(slug: string): STM32Lesson | undefined {
  return stm32TutorialLessons.find(lesson => lesson.slug === slug);
}
