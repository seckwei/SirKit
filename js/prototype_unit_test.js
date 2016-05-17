describe('Utility functions', function(){

    describe('isNumber()',function(){

        it('should return false for empty and non-empty string', function(){
            expect(isNumber('')).toBe(false);
            expect(isNumber(new String())).toBe(false);
            expect(isNumber('string')).toBe(false);
        });

        it('should return false for NaN, null and undefined', function(){
            expect(isNumber(NaN)).toBe(false);
            expect(isNumber(null)).toBe(false);
            expect(isNumber(undefined)).toBe(false);
        });

        it('should return false for object', function(){
            expect(isNumber({})).toBe(false);
            expect(isNumber(new Object())).toBe(false);
        });

        it('should return true for integer, float, and Number object', function(){
            expect(isNumber(3)).toBe(true);
            expect(isNumber(0.333)).toBe(true);
            expect(isNumber(new Number())).toBe(true);
        });

    });

    describe('objectToArray()',function(){

        it('should convert object to array type', function(){
            expect(objectToArray({})).toEqual([]);
            expect(objectToArray({}) instanceof Array).toBe(true);
            expect(objectToArray({})).not.toEqual({});
        });

        it('should conver array-like objects to array with the values retained', function(){
            (function(){
                expect(objectToArray(arguments)).toEqual([1,2,3]);
            })(1,2,3);
        });
    });

    describe('logger()',function(){

        it('should throw an Error', function(){
            expect(logger).toThrowError();
        });

        it('should throw an Error with supplied message', function(){
            expect(logger.bind(null, 'custom message')).toThrowError('custom message');
        });

    });

    describe('hasDuplicatePositions()',function(){

        it('should return true if duplicate positions are present', function(){
            let positions = [[0,0],[1,1],[0,0],[3,3]];
            expect(hasDuplicatePositions(positions)).toBe(true);
        });

        it('should return false if duplicate positions are absent', function(){
            let positions = [[0,1],[1,1],[0,0],[3,3]];
            expect(hasDuplicatePositions(positions)).toBe(false);
        });

    });
});

describe('Sirkit\'s Topological Prototype', function(){

    beforeEach(function(){
        window.board = Board(2,3);
        window.cmpt1 = Component({ label: 'Component 1'});
    });
    
    describe('Board object',function(){

        it('should return an object with 2D array with undefined values if provided width and height', function(){
            let emptyBoard = [new Array(3), new Array(3)];
            expect(board.board).toEqual(emptyBoard);
        });

        it('Board.place() should add Component into Slot specified by the pin positions', function(){
            // Place component's pin-0 into [0,0] and pin-1 into [1,1]
            cmpt1.place([0,0], [1,1]);

            let component_id = cmpt1.id,
                slot00_connections = board.board[0][0].connections,
                slot11_connections = board.board[1][1].connections;

            expect(slot00_connections.get(component_id).object).toEqual(cmpt1);
            expect(slot11_connections.get(component_id).object).toEqual(cmpt1);

            expect(slot00_connections.get(component_id).pin).toBe(0);
            expect(slot11_connections.get(component_id).pin).toBe(1);
        });
        
        it('Board.remove() should remove Component from its Slot', function(){
            // Place component's pin-0 into [0,0] and pin-1 into [1,1]
            cmpt1.place([0,0], [1,1]);
            
            let component_id = cmpt1.id,
                slot00_connections = board.board[0][0].connections,
                slot11_connections = board.board[1][1].connections;
            
            board.remove(cmpt1);
            expect(slot00_connections.size).toBe(0);
            expect(slot11_connections.size).toBe(0);
        });

    });

    describe('Slot object',function(){

        it('should be initialised with only positive numbers', function(){
            let error_msg = 'x and y has to be positive numbers';
            expect(Slot.bind(null,0,-1)).toThrowError(error_msg);
            expect(Slot.bind(null,-1,0)).toThrowError(error_msg);
            expect(Slot.bind(null,-1,-1)).toThrowError(error_msg);
            expect(Slot.bind(null,'b','')).toThrowError(error_msg);
            expect(Slot.bind(null,{},[])).toThrowError(error_msg);

            expect(Slot.bind(null,0,5)).not.toThrowError();
            expect(Slot.bind(null,0,5.11)).not.toThrowError();
        });

        it('should floor x and y values when initialised', function(){
            let slot = Slot(3.14159, 9.99);
            expect(slot.x).toBe(3);
            expect(slot.y).toBe(9); 
        });
    });
});

/*
describe('',function(){

    it('should ', function(){});

});
*/