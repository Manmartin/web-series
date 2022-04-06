export async function makeRequest(url, method="GET", params=null, headers={}, func) {
    try {
        const response = await fetch(url, {
            method: method,
            body: params,
            headers: headers
        });
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }
        if (func) {
            const data = await response.json();
            func(data);
        }
    } catch (error) {
        console.log(error);
    }
}
