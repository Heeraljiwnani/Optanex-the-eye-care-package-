import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Target, Users, Award, Shield, Heart, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { PrivacyPolicyDialog } from "@/components/PrivacyPolicyDialog";

export default function About() {
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
        <motion.div
            className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {/* Header */}
            <motion.div
                className="text-center space-y-4"
                variants={itemVariants}
            >
                <div className="w-16 h-16 mx-auto  rounded-2xl flex items-center justify-center">
                    <img src="/optanex-logo.png" alt="OptaNex Logo" className="w-10 h-8 rounded-lg" />
                </div>
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex justify-center items-center gap-2 flex-wrap">
                        {t("about_title")}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="ml-0 sm:ml-2 rounded-full hover:bg-primary/10">
                                    <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 text-dashboard" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-0 text-left">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-gradient-head mb-4">{t("about_help_title")}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 text-foreground/90 leading-relaxed whitespace-pre-wrap">
                                    {t("about_help_content")}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground">{t("about_subtitle")}</p>
                </div>
            </motion.div>

            {/* Mission */}
            <motion.div variants={itemVariants}>
                <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Target className="h-5 w-5 text-dashboard" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-black mb-3">{t("mission_title")}</h2>
                                <p className="text-black leading-relaxed">
                                    {t("mission_desc")}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* What We Do */}
            <motion.div
                className="grid md:grid-cols-2 gap-6"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-black">
                                <Users className="h-5 w-5 text-dashboard" />
                                {t("who_we_serve_title")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black">
                                {t("who_we_serve_desc")}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-black">
                                <Award className="h-5 w-5 text-dashboard" />
                                {t("excellence_title")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black">
                                {t("excellence_desc")}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Key Features Highlights */}
            <motion.div variants={itemVariants}>
                <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-black">
                            <Heart className="h-5 w-5 text-dashboard" />
                            {t("why_choose_title")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid sm:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-black">{t("ai_screening_title")}</h3>
                                <p className="text-sm text-black">{t("ai_screening_desc")}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-black">{t("smart_tracking_title")}</h3>
                                <p className="text-sm text-black">{t("smart_tracking_desc")}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-black">{t("data_privacy_title")}</h3>
                                <p className="text-sm text-black">{t("data_privacy_desc")}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Privacy Commitment */}
            <motion.div variants={itemVariants}>
                <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Shield className="h-6 w-6 text-success" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-black">{t("committed_privacy_title")}</h3>
                            <p className="text-sm text-black">
                                {t("committed_privacy_desc")}
                                <PrivacyPolicyDialog>
                                    <span className="text-gradient-head hover:underline cursor-pointer mx-1">
                                        {t("check_privacy_policy")}
                                    </span>
                                </PrivacyPolicyDialog>
                                {t("to_learn_more")}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

        </motion.div>
    );
}
