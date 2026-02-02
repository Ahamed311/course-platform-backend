'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NavigationHistory {
  path: string;
  timestamp: number;
}

export function useNavigation() {
  const router = useRouter();
  const [history, setHistory] = useState<NavigationHistory[]>([]);

  useEffect(() => {
    // Récupérer l'historique du localStorage
    const savedHistory = localStorage.getItem('navigation_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Erreur lors du chargement de l\'historique:', error);
      }
    }
  }, []);

  const addToHistory = (path: string) => {
    const newEntry: NavigationHistory = {
      path,
      timestamp: Date.now()
    };

    setHistory(prev => {
      // Éviter les doublons consécutifs
      if (prev.length > 0 && prev[prev.length - 1].path === path) {
        return prev;
      }

      // Garder seulement les 10 dernières pages
      const newHistory = [...prev, newEntry].slice(-10);
      
      // Sauvegarder dans localStorage
      localStorage.setItem('navigation_history', JSON.stringify(newHistory));
      
      return newHistory;
    });
  };

  const goBack = () => {
    if (history.length > 1) {
      // Retirer la page actuelle et aller à la précédente
      const previousPage = history[history.length - 2];
      
      // Mettre à jour l'historique
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      localStorage.setItem('navigation_history', JSON.stringify(newHistory));
      
      router.push(previousPage.path);
    } else {
      // Si pas d'historique, aller à l'accueil
      router.push('/');
    }
  };

  const goToPage = (path: string) => {
    addToHistory(path);
    router.push(path);
  };

  const canGoBack = history.length > 1;
  const previousPage = history.length > 1 ? history[history.length - 2] : null;

  return {
    goBack,
    goToPage,
    addToHistory,
    canGoBack,
    previousPage,
    history
  };
}