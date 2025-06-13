import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext(null);

function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }
    return context;
}

const SidebarProvider = React.forwardRef(
    (
        {
            defaultOpen = true,
            open: openProp,
            onOpenChange: setOpenProp,
            className,
            style,
            children,
            ...props
        },
        ref
    ) => {
        const isMobile = useIsMobile();
        const [openMobile, setOpenMobile] = React.useState(false);

        const [_open, _setOpen] = React.useState(defaultOpen);
        const open = openProp ?? _open;
        const setOpen = React.useCallback(
            (value) => {
                const openState =
                    typeof value === "function" ? value(open) : value;
                if (setOpenProp) {
                    setOpenProp(openState);
                } else {
                    _setOpen(openState);
                }

                document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
            },
            [setOpenProp, open]
        );

        const toggleSidebar = React.useCallback(() => {
            return isMobile
                ? setOpenMobile((open) => !open)
                : setOpen((open) => !open);
        }, [isMobile, setOpen, setOpenMobile]);

        React.useEffect(() => {
            const handleKeyDown = (event) => {
                if (
                    event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
                    (event.metaKey || event.ctrlKey)
                ) {
                    event.preventDefault();
                    toggleSidebar();
                }
            };

            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }, [toggleSidebar]);

        const state = open ? "expanded" : "collapsed";

        const contextValue = React.useMemo(
            () => ({
                state,
                open,
                setOpen,
                isMobile,
                openMobile,
                setOpenMobile,
                toggleSidebar,
            }),
            [
                state,
                open,
                setOpen,
                isMobile,
                openMobile,
                setOpenMobile,
                toggleSidebar,
            ]
        );

        return (
            <SidebarContext.Provider value={contextValue}>
                <TooltipProvider delayDuration={0}>
                    <div
                        style={{
                            "--sidebar-width": SIDEBAR_WIDTH,
                            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                            ...style,
                        }}
                        className={cn(
                            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
                            className
                        )}
                        ref={ref}
                        {...props}
                    >
                        {children}
                    </div>
                </TooltipProvider>
            </SidebarContext.Provider>
        );
    }
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef(
    (
        {
            side = "left",
            variant = "sidebar",
            collapsible = "offcanvas",
            className,
            children,
            ...props
        },
        ref
    ) => {
        const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

        if (collapsible === "none") {
            return (
                <div
                    className={cn(
                        "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </div>
            );
        }

        if (isMobile) {
            return (
                <Sheet
                    open={openMobile}
                    onOpenChange={setOpenMobile}
                    {...props}
                >
                    <SheetContent
                        data-sidebar="sidebar"
                        data-mobile="true"
                        className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
                        style={{
                            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                        }}
                        side={side}
                    >
                        <div className="flex h-full w-full flex-col">
                            {children}
                        </div>
                    </SheetContent>
                </Sheet>
            );
        }

        return (
            <div
                ref={ref}
                className="group peer hidden md:block text-sidebar-foreground"
                data-state={state}
                data-collapsible={state === "collapsed" ? collapsible : ""}
                data-variant={variant}
                data-side={side}
            >
                {/* This is what handles the sidebar gap on desktop */}
                <div
                    className={cn(
                        "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
                        "group-data-[collapsible=offcanvas]:w-0",
                        "group-data-[side=right]:rotate-180",
                        variant === "floating" || variant === "inset"
                            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
                            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
                    )}
                />
                <div
                    className={cn(
                        "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
                        side === "left"
                            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                        // Adjust the padding for floating and inset variants.
                        variant === "floating" || variant === "inset"
                            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
                            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
                        className
                    )}
                    {...props}
                >
                    <div
                        data-sidebar="sidebar"
                        className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef(
    ({ className, onClick, ...props }, ref) => {
        const { toggleSidebar } = useSidebar();

        return (
            <Button
                variant="ghost"
                size="icon"
                className={cn("h-fit", className)}
                ref={ref}
                onClick={(event) => {
                    toggleSidebar();
                    onClick?.(event);
                }}
                {...props}
            >
                <PanelLeft className="h-5 w-5" />
            </Button>
        );
    }
);
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarHeader = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "relative flex items-center justify-between border-b px-6 py-4",
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarHeaderTitle = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        const { state } = useSidebar();
        return (
            <div
                className={cn(
                    "text-md flex flex-row items-center font-semibold tracking-tight duration-200 group-data-[state=collapsed]/sidebar-wrapper:opacity-0",
                    className
                )}
                data-collapsed={state === "collapsed"}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);
SidebarHeaderTitle.displayName = "SidebarHeaderTitle";

const SidebarHeaderDescription = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        const { state } = useSidebar();
        return (
            <p
                className={cn(
                    "text-sm text-muted-foreground duration-200 group-data-[state=collapsed]/sidebar-wrapper:opacity-0",
                    className
                )}
                data-collapsed={state === "collapsed"}
                ref={ref}
                {...props}
            >
                {children}
            </p>
        );
    }
);
SidebarHeaderDescription.displayName = "SidebarHeaderDescription";

const SidebarFooter = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        const { state } = useSidebar();
        return (
            <div
                className={cn(
                    "flex items-center justify-between border-t px-6 py-4 duration-200 group-data-[state=collapsed]/sidebar-wrapper:h-0 group-data-[state=collapsed]/sidebar-wrapper:overflow-hidden group-data-[state=collapsed]/sidebar-wrapper:px-2",
                    className
                )}
                data-collapsed={state === "collapsed"}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);
SidebarFooter.displayName = "SidebarFooter";

const SidebarBody = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        const { state } = useSidebar();
        return (
            <div
                className={cn(
                    "flex-1 space-y-1 overflow-auto px-3 py-2 duration-200 [scrollbar-width:none] group-data-[state=collapsed]/sidebar-wrapper:px-2",
                    className
                )}
                data-collapsed={state === "collapsed"}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);
SidebarBody.displayName = "SidebarBody";

const SidebarMenu = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        return (
            <nav
                className={cn("flex flex-col space-y-1", className)}
                ref={ref}
                {...props}
            >
                {children}
            </nav>
        );
    }
);
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        const { state } = useSidebar();
        return (
            <Slot
                className={cn(
                    "group flex h-10 items-center justify-center gap-2 overflow-hidden rounded-md px-3 text-sm font-medium duration-200 hover:bg-gray-100 hover:text-gray-900 group-data-[state=collapsed]/sidebar-wrapper:justify-center group-data-[state=collapsed]/sidebar-wrapper:px-0",
                    className
                )}
                data-collapsed={state === "collapsed"}
                ref={ref}
                {...props}
            >
                {children}
            </Slot>
        );
    }
);
SidebarMenuItem.displayName = "SidebarMenuItem";

const SidebarMenuLink = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        return (
            <SidebarMenuItem
                className={cn("w-full", className)}
                ref={ref}
                {...props}
            >
                {children}
            </SidebarMenuItem>
        );
    }
);
SidebarMenuLink.displayName = "SidebarMenuLink";

const SidebarMenuButton = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        return (
            <SidebarMenuItem
                className={cn("w-full", className)}
                ref={ref}
                {...props}
            >
                {children}
            </SidebarMenuItem>
        );
    }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuSeparator = React.forwardRef(
    ({ className, ...props }, ref) => {
        const { state } = useSidebar();
        return (
            <Separator
                className={cn(
                    "my-4 duration-200 group-data-[state=collapsed]/sidebar-wrapper:opacity-0",
                    className
                )}
                data-collapsed={state === "collapsed"}
                ref={ref}
                {...props}
            />
        );
    }
);
SidebarMenuSeparator.displayName = "SidebarMenuSeparator";

const SidebarMenuTitle = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        const { state } = useSidebar();
        return (
            <h4
                className={cn(
                    "mb-1 px-3 text-sm font-semibold tracking-tight text-gray-900 duration-200 group-data-[state=collapsed]/sidebar-wrapper:h-0 group-data-[state=collapsed]/sidebar-wrapper:overflow-hidden group-data-[state=collapsed]/sidebar-wrapper:px-0",
                    className
                )}
                data-collapsed={state === "collapsed"}
                ref={ref}
                {...props}
            >
                {children}
            </h4>
        );
    }
);
SidebarMenuTitle.displayName = "SidebarMenuTitle";

const SidebarMenuIcon = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        const { state } = useSidebar();
        return (
            <div
                className={cn(
                    "flex h-5 w-5 items-center justify-center",
                    state === "collapsed" &&
                        "group-data-[collapsed]/sidebar-menu-item:h-auto group-data-[collapsed]/sidebar-menu-item:w-auto",
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);
SidebarMenuIcon.displayName = "SidebarMenuIcon";

const SidebarMenuText = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        const { state } = useSidebar();
        return (
            <span
                className={cn(
                    "flex-1 text-left",
                    state === "collapsed" &&
                        "group-data-[collapsed]/sidebar-menu-item:hidden",
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </span>
        );
    }
);
SidebarMenuText.displayName = "SidebarMenuText";

const SidebarMenuBadge = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        const { state } = useSidebar();
        return (
            <span
                className={cn(
                    "ml-auto inline-flex h-5 items-center justify-center rounded-full bg-primary px-2 text-xs font-semibold text-primary-foreground duration-200 group-data-[state=collapsed]/sidebar-wrapper:h-0 group-data-[state=collapsed]/sidebar-wrapper:overflow-hidden group-data-[state=collapsed]/sidebar-wrapper:px-0",
                    className
                )}
                data-collapsed={state === "collapsed"}
                ref={ref}
                {...props}
            >
                {children}
            </span>
        );
    }
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarOverlay = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        const { isMobile, openMobile, setOpenMobile } = useSidebar();
        if (!isMobile) return null;
        return (
            <div
                onClick={() => setOpenMobile(false)}
                className={cn(
                    "fixed inset-0 z-40 bg-black/50 duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
                    className
                )}
                data-state={openMobile ? "open" : "closed"}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);
SidebarOverlay.displayName = "SidebarOverlay";

const SidebarCollapseButton = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        const { state, toggleSidebar } = useSidebar();
        return (
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "absolute right-0 top-1/2 hidden h-8 w-8 -translate-y-1/2 translate-x-1/2 rounded-full border bg-background opacity-0 shadow-md duration-200 group-data-[collapsible=icon]/sidebar-wrapper:opacity-100 group-data-[collapsible=offcanvas]/sidebar-wrapper:group-hover/sidebar-wrapper:block group-data-[collapsible=offcanvas]/sidebar-wrapper:group-hover/sidebar-wrapper:opacity-100",
                    className
                )}
                onClick={toggleSidebar}
                ref={ref}
                {...props}
            >
                {children}
            </Button>
        );
    }
);
SidebarCollapseButton.displayName = "SidebarCollapseButton";

export {
    Sidebar,
    SidebarProvider,
    SidebarTrigger,
    SidebarHeader,
    SidebarHeaderTitle,
    SidebarHeaderDescription,
    SidebarBody,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuLink,
    SidebarMenuButton,
    SidebarMenuSeparator,
    SidebarMenuTitle,
    SidebarMenuIcon,
    SidebarMenuText,
    SidebarMenuBadge,
    SidebarOverlay,
    SidebarCollapseButton,
    useSidebar,
};
