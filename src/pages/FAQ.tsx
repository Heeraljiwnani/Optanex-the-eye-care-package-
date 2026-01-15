import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function FAQ() {
    const { t } = useTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-background p-4 sm:p-6 space-y-6 sm:space-y-8">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto text-center space-y-4"
            >
                <h1 className="text-3xl sm:text-4xl font-bold text-gradient-head flex justify-center items-center gap-2 flex-wrap">
                    {t("faq_title")}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-0 sm:ml-2 rounded-full hover:bg-primary/10">
                                <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 text-dashboard" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-0">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gradient-head mb-4">{t("faq_help_title")}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 text-foreground/90 leading-relaxed whitespace-pre-wrap">
                                {t("faq_help_content")}
                            </div>
                        </DialogContent>
                    </Dialog>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground w-full">
                    {t("faq_subtitle")}
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="max-w-3xl mx-auto"
            >
                <Card className="bg-card/50 border-0 shadow-custom-lg">
                    <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {[
                                { value: "item-1", q: t("faq_q1"), a: t("faq_a1") },
                                { value: "item-2", q: t("faq_q2"), a: t("faq_a2") },
                                { value: "item-3", q: t("faq_q3"), a: t("faq_a3") },
                                { value: "item-4", q: t("faq_q4"), a: t("faq_a4") },
                                { value: "item-5", q: t("faq_q5"), a: t("faq_a5") },
                                { value: "item-6", q: t("faq_q6"), a: t("faq_a6") }
                            ].map((faq, index) => (
                                <AccordionItem key={index} value={faq.value} className="border-b-border/40">
                                    <AccordionTrigger className="text-left text-lg hover:no-underline hover:text-blue-600 transition-colors">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
