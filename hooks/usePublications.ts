import { useState } from 'react';

export interface Publication {
  title: string;
  authors: string;
  source: string;
}

export const usePublications = () => {
  const [selectedPublications] = useState<Publication[]>([
    {
      title: "An inspection robot for belt conveyor maintenance in underground mine—Infrared thermography for overheated idlers detection.",
      authors: "J Szrek, J Wodecki, R Błażej, R Zimroz",
      source: "Applied Sciences, 2020."
    },
    {
      title: "Optimal filter design with progressive genetic algorithm for local damage detection in rolling bearings.",
      authors: "J Wodecki, A Michalak, R Zimroz",
      source: "Mechanical Systems and Signal Processing, 2018."
    },
    {
      title: "Novel method of informative frequency band selection for vibration signal using Nonnegative Matrix Factorization of spectrogram matrix.",
      authors: "J Wodecki, P Kruczek, A Bartkowiak, R Zimroz, A Wyłomańska",
      source: "Mechanical Systems and Signal Processing, 2019."
    }
  ]);

  const [recentPublications] = useState<Publication[]>([
    {
      title: "A Method for Assessing the Performance of Breaking Hammers Based on Acoustic Signal and Video Analysis.",
      authors: "J Wodecki, P Dąbek, P Krot, A Wróblewski, R Zimroz",
      source: "Applied Sciences , 2025."
    },
    {
      title: "Heterogeneous Information Fusion for Robot-Based Automated Monitoring of Bearings in Harsh Environments via Ensemble of Classifiers with Dynamic Weighted Voting.",
      authors: "M Siami, P Dąbek, H Shiri, A Michalak, J Wodecki, T Barszcz, R Zimroz",
      source: "Sensors, 2025."
    },
    {
      title: "A method for signal components identification in acoustic signal with non-Gaussian background noise using clustering of data in time-frequency domain.",
      authors: "A Drewnicka, A Michalak, R Zimroz, A Kumar, A Wyłomańska, J Wodecki",
      source: "Applied Acoustics, 2025."
    }
  ]);

  return {
    selectedPublications,
    recentPublications
  };
};