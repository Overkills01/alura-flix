import React, { useState, useEffect } from 'react';
import { WaveLoader } from 'react-loaders-kit';
import './Loading.css';

const getCssVariable = (variable) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variable);
};

const Loading = ({ isPageLoaded, retryLoadingPage }) => {
    const [showLogo, setShowLogo] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Por favor, aguarde un momento...");
    const [pageLoaded, setPageLoaded] = useState(isPageLoaded);

    useEffect(() => {
        const logoTimer = setTimeout(() => {
            setShowLogo(false);
            if (!isPageLoaded) {
                setShowLoader(true);
            } else {
                setPageLoaded(true);
            }
        }, 5000);

        if (!isPageLoaded) {
            const messageTimer = setInterval(() => {
                setLoadingMessage(getRandomMessage());
            }, 5000);

            window.addEventListener('online', handleOnline);

            return () => {
                clearTimeout(logoTimer);
                clearInterval(messageTimer);
                window.removeEventListener('online', handleOnline);
            };
        } else {
            return () => {
                clearTimeout(logoTimer);
            };
        }
    }, [isPageLoaded]);

    const handleOnline = () => {
        retryLoadingPage();
    };

    useEffect(() => {
        if (isPageLoaded) {
            setShowLoader(false);
            setPageLoaded(true);
        }
    }, [isPageLoaded]);

    const getRandomMessage = () => {
        const messages = [
            "Cargando la página, por favor espere un momento...",
            "La página está tardando más de lo esperado en cargar. Gracias por su paciencia...",
            "Parece que hay un problema de conexión, verifique su internet o recarge la pagina.",
        ];
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    };

    const headerBgColor = getCssVariable("--color-frontend");
    const stSecondaryColor = getCssVariable("--color-inov-gestao");
    const ndSecondaryColor = getCssVariable("--color-backend");

    const loaderProps = {
        loading: true,
        size: 100,
        duration: 1,
        colors: [headerBgColor, stSecondaryColor, ndSecondaryColor],
    };

    if (showLogo) {
        return (
            <div className="loading-container">
                <img src="/logo2.png" alt="Loading Logo" className="loading-logo" />
            </div>
        );
    }

    if (showLoader) {
        return (
            <div className="loading-container">
                <WaveLoader {...loaderProps} />
                <h2 className="loading-message">{loadingMessage}</h2>
            </div>
        );
    }

    if (pageLoaded) {
        return null; 
    }

    return null;
};

export default Loading;
