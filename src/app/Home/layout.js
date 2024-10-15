"use client"
import Navbar from "@/components/Navbar/navbar";
import { Provider } from "react-redux";
import store from "@/redux/store";



export default function RootLayout({ children }) {
    return (
        <Provider store={store}>
            <div >
                <Navbar />
                <div>

                    {children}
                </div>
            </div>
        </Provider>
    );
}
