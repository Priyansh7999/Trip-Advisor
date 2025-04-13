import React, { useEffect, useState } from 'react';
import styles from './AddPlaces.module.css';

export default function UpdatePlaces() {
  const [searchName, setSearchName] = useState('');
  const [placeData, setPlaceData] = useState(null);
  const [error, setError] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [suggestedDuration, setSuggestedDuration] = useState('');
  const [whatToExpect, setWhatToExpect] = useState('');
  const [tips, setTips] = useState(['']);
  const [history, setHistory] = useState('');
  const [highlights, setHighlights] = useState('');
  const [timings, setTimings] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [restrictedItems, setRestrictedItems] = useState('');
  const [moreAbout, setMoreAbout] = useState('');
  const [bestTime, setBestTime] = useState('');
  const [urls, setUrls] = useState(['']);

  const addField = (setState) => {
    setState((prev) => [...prev, '']);
  };

  const handleChange = (index, array, setArray, value) => {
    const updated = [...array];
    updated[index] = value;
    setArray(updated);
  };

  const handleDelete = (index, array, setArray) => {
    const updated = array.filter((_, i) => i !== index);
    setArray(updated);
  };

  const fetchPlace = async () => {
    try {
      const res = await fetch(`http://localhost:5000/get-place/${searchName}`);
      if (!res.ok) throw new Error('Place not found');
      const data = await res.json();
      setPlaceData(data);
      console.log(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setPlaceData(null);
    }
  };

  useEffect(() => {
    if (placeData) {
      setName(placeData.name || '');
      setDesc(placeData.description || '');
      setCity(placeData.city || '');
      setState(placeData.state || '');
      setLatitude(placeData.latitude || '');
      setLongitude(placeData.longitude || '');
      setSuggestedDuration(placeData.suggestedduration || '');
      setWhatToExpect(placeData.whattoexpect || '');
      try {
        const parsedTips = typeof placeData.tips === 'string' ? JSON.parse(placeData.tips) : placeData.tips;
        setTips(Array.isArray(parsedTips) ? parsedTips : ['']);
      } catch {
        setTips(['']);
      }


      setHistory(placeData.overview?.history || '');
      setHighlights(placeData.overview?.highlights || '');
      setTimings(placeData.overview?.timings || '');
      setEntryFee(placeData.overview?.entryFee || '');
      setRestrictedItems(placeData.overview?.restrictedItems || '');
      setMoreAbout(placeData.moreabout || '');
      setBestTime(placeData.besttime || '');
      setUrls(Array.isArray(placeData.urls) ? placeData.urls : []);
    }
  }, [placeData]);

  const handleDeleteData = async (name) => {
    if (!name) {
      alert("No place name provided.");
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:5000/delete-place/${name}`, {
        method: 'DELETE',
      });
  
      const data = await res.json();
      alert(data.message || data.error);
  
      if (data.message) {
        // Reset all fields
        setName('');
        setDesc('');
        setCity('');
        setState('');
        setLatitude(0);
        setLongitude(0);
        setSuggestedDuration(0);
        setWhatToExpect('');
        setHistory('');
        setHighlights('');
        setTimings('');
        setEntryFee('');
        setRestrictedItems('');
        setMoreAbout('');
        setBestTime('');
        setUrls(['']);
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed: ' + err.message);
    }
  };
  
  

  const handleSubmit = async () => {

    const placeDetails = {
      name,
      desc,
      city,
      state,
      latitude,
      longitude,
      suggestedDuration,
      whatToExpect,
      tips,
      overview: {
        history,
        highlights,
        timings,
        entryFee,
        restrictedItems,
      },
      moreAbout,
      bestTime,
      urls,
    };

    try {
      const res = await fetch(`http://localhost:5000/update-place/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(placeDetails),
      });

      const data = await res.json();
      alert(data.message || data.error);
      if(data.message){
        setName('');
        setDesc('');
        setCity('');
        setState('');
        setLatitude(0);
        setLongitude(0);
        setSuggestedDuration(0);
        setWhatToExpect('');
        setHistory('');
        setHighlights('');
        setTimings('');
        setEntryFee('');
        setRestrictedItems('');
        setMoreAbout('');
        setBestTime('');
        setUrls(['']);
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Search Place</h1>
      <form onSubmit={(e) => { e.preventDefault(); fetchPlace(); }} className={styles.formInput}>
        <input
          className={styles.formdata}
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter place name to edit"
        />
        <button type="submit" className={styles.submitButton}>Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {placeData && (
        <div>
          <h1>Update Place</h1>
          <div className={styles.formdata}>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className={styles.formdata}>
            <label>City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} />
            <label>State</label>
            <input value={state} onChange={(e) => setState(e.target.value)} />
          </div>

          <div className={styles.formdata}>
            <label>Description</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>

          <div className={styles.formdata}>
            <label>Latitude</label>
            <input value={latitude} onChange={(e) => setLatitude(e.target.value)} />
            <label>Longitude</label>
            <input value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          </div>

          <div className={styles.formdata}>
            <label>Suggested Duration</label>
            <input value={suggestedDuration} onChange={(e) => setSuggestedDuration(e.target.value)} />
          </div>

          <h1>Others</h1>
          <div className={styles.formdata}>
            <label>What to Expect</label>
            <textarea value={whatToExpect} onChange={(e) => setWhatToExpect(e.target.value)} />
          </div>

          <div className={styles.formdataAdd}>
            <label>Tips</label>
            {tips.map((tip, i) => (
              <div key={i} className={styles.formdataAdd}>
                <input
                  type="text"
                  value={tip}
                  onChange={(e) => handleChange(i, tips, setTips, e.target.value)}
                />
                {tips.length > 1 && (
                  <button type="button" onClick={() => handleDelete(i, tips, setTips)}>Delete</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addField(setTips)}>Add+</button>
          </div>


          <h1>Overview</h1>
          {[{ label: 'History', state: history, setState: setHistory },
          { label: 'Highlights', state: highlights, setState: setHighlights },
          { label: 'Timings', state: timings, setState: setTimings },
          { label: 'Entry Fee', state: entryFee, setState: setEntryFee },
          { label: 'Restricted Items', state: restrictedItems, setState: setRestrictedItems },
          ].map((section, i) => (
            <div key={i} className={styles.formdata}>
              <label>{section.label}</label>
              {section.label === 'History'
                ? <textarea value={section.state} onChange={(e) => section.setState(e.target.value)} />
                : <input value={section.state} onChange={(e) => section.setState(e.target.value)} />}
            </div>
          ))}

          <div className={styles.formdata}>
            <label>More About</label>
            <textarea value={moreAbout} onChange={(e) => setMoreAbout(e.target.value)} />
          </div>

          <div className={styles.formdata}>
            <label>Best Time to Visit</label>
            <input value={bestTime} onChange={(e) => setBestTime(e.target.value)} />
          </div>

          <div className={styles.formdataAdd}>
            {urls.map((url, i) => (
              <div key={i} className={styles.formdataAdd}>
                <label>URL {i + 1}</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleChange(i, urls, setUrls, e.target.value)}
                />
                {urls.length > 1 && (
                  <button type="button" onClick={() => handleDelete(i, urls, setUrls)}>Delete</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addField(setUrls)}>Add+</button>
          </div>

          <div className={styles.button}>
            <button onClick={handleSubmit} className={styles.submitButton}>Update</button>
          </div>
          <div className={styles.button}>
            <button onClick={()=>handleDeleteData(name)} className={styles.submitButton}>Delete</button>
          </div>

        </div>
      )}
    </div>
  );
}
