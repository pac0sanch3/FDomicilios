import React from "react";
import { NotificacionesDomComponent } from "../components/notificaciones/NotificacionesDomComponent";
import Layout from "../components/template/Layout";
import { SolicitudesProvider } from "../services/SolicitudesProvider";

export const NotificacionesDom = () => {
    return (
        <Layout>
            <SolicitudesProvider>
                <NotificacionesDomComponent />
            </SolicitudesProvider>
        </Layout>
    );
}
