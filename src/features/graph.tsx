import { fetchMovies, fetchSpaceships } from "@/shared/services";
import type { Character } from "@/shared/types";
import {
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Node,
  type Edge,
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect } from 'react';

interface Props {
  hero: Character | null,
}

export const Graph = ({ hero }: Props) => {
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  const fetchHeroDetails = useCallback(async (hero: Character) => {
    try {

      const { movies, movieNodes, movieEdges } = await fetchMovies(hero);
      const { spaceshipNodes, spaceshipEdges } = await fetchSpaceships(movies, hero);

      const newNodes = [
        {
          id: String(hero.id),
          position: { x: 240, y: 0 },
          data: { label: hero.name },
          type: 'input',
          style: { border: '1px solid red', fontWeight: '600', fontSize: '16px', width: 'fit-content', paddingInline: '30px' }
        },
        ...movieNodes,
        ...spaceshipNodes
      ]

      const newEdges = [
        ...movieEdges,
        ...spaceshipEdges,
      ]

      setNodes(newNodes);
      setEdges(newEdges as Edge[]);
    } catch (error) {
      console.error('Error fetching hero details:', error);
    }
  }, [setNodes, setEdges])

  useEffect(() => {
    if (hero) {
      fetchHeroDetails(hero);
    }
  }, [hero, fetchHeroDetails]);

  return (
    <div className="flex grow h-[500px] w-full" data-testid="character-graph">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        draggable
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};
