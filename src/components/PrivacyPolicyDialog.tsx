import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

interface PrivacyPolicyDialogProps {
    children: ReactNode;
}

export function PrivacyPolicyDialog({ children }: PrivacyPolicyDialogProps) {
    const { t } = useTranslation();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Shield className="h-6 w-6 text-primary" />
                        {t("privacy_policy_title")}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 text-sm text-muted-foreground">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <h3 className="text-base font-semibold text-foreground mb-2">{t("data_storage_title")}</h3>
                        <p className="mb-2">
                            {t("data_storage_trust")}
                        </p>
                        <p className="font-medium text-foreground">
                            {t("data_storage_supabase")}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-base font-semibold text-foreground">{t("privacy_intro_title")}</h3>
                        <p>
                            {t("privacy_intro_content")}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-base font-semibold text-foreground">{t("privacy_info_title")}</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>{t("privacy_info_personal")}</li>
                            <li>{t("privacy_info_medical")}</li>
                            <li>{t("privacy_info_usage")}</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-base font-semibold text-foreground">{t("privacy_rights_title")}</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>{t("privacy_right_access")}</li>
                            <li>{t("privacy_right_correction")}</li>
                            <li>{t("privacy_right_erasure")}</li>
                            <li>{t("privacy_right_grievance")}</li>
                        </ul>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                        <h3 className="text-base font-semibold text-foreground mb-1">{t("privacy_contact_title")}</h3>
                        <p>
                            {t("privacy_contact_content")}
                            <br />
                            <span className="text-foreground font-medium">privacy@optanex.com</span>
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
