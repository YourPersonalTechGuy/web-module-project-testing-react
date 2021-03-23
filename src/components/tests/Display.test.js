import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from "./../Display"


const testShow = {
    //add in approprate test data structure here.
    show: {
        name: "Stranger Things",
        image: {
          medium: "https://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
          original: "https://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg"
        },
        summary: "",
        seasons: [
            {
                id: 0,
                name: "Season 1",
                episodes: []
            },
            
            {
                id: 1,
                name: "Season 2",
                episodes: []
            },
        ]
      },
}

test('renders Display without props without errors', ()=>{
    render(<Display />);
});

test('renders show component when fetch button is pressed', ()=>{
    render(<Display />);

    const fetchButton = screen.queryByText("Press to Get Show Data")
    
    userEvent.click(fetchButton)
    
    waitFor(()=>{expect(screen.queryByTestId("show-container")).toBeInTheDocument()});


});

test('renders correct number of options when fetch button is pressed', ()=>{
    render(<Display show={testShow.show}/>);

    const fetchButton = screen.queryByText("Press to Get Show Data")
    
    userEvent.click(fetchButton)
    
    waitFor(()=>{
        expect(screen.queryAllByTestId('season-option').toHaveLength(testshow.show.seasons.length));
    });


});

test("displays optional function in console", ()=>{
    const fakeFunk = jest.fn()

    render(<Display displayFun={fakeFunk}/>)

    const fetchButton = screen.queryByText("Press to Get Show Data")
    
    userEvent.click(fetchButton)

    waitFor(()=>{
        expect(fakeFunk).toHaveBeenCalledTimes(1)
    });
    
})














///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.